import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Wrench, FolderKanban, GraduationCap,
  Briefcase, Award, Link2, Check, Save, Eye, Monitor, Tablet, Smartphone,
} from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "../context/PortfolioContext";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import CertificatesForm from "../components/forms/CertificatesForm";
import SocialLinksForm from "../components/forms/SocialLinksForm";
import LivePreview from "../components/preview/LivePreview";
import DeviceToggle from "../components/preview/DeviceToggle";

const STEPS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "social", label: "Social", icon: Link2 },
];

const FORM_MAP = {
  personal: PersonalInfoForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  education: EducationForm,
  experience: ExperienceForm,
  certificates: CertificatesForm,
  social: SocialLinksForm,
};

export default function EditorPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const initial = params.get("section") || "personal";
  const [active, setActive] = useState(initial);
  const [device, setDevice] = useState("desktop");
  const [mobileTab, setMobileTab] = useState("edit"); // edit | preview
  const { portfolio, updatePortfolio, fetchPortfolio } = usePortfolio();

  useEffect(() => {
    setParams({ section: active }, { replace: true });
  }, [active]);

  const isCompleted = (id) => {
    if (!portfolio) return false;
    switch (id) {
      case "personal": return !!portfolio.personalInfo?.fullName;
      case "skills": return portfolio.skills?.length > 0;
      case "projects": return portfolio.projects?.length > 0;
      case "education": return portfolio.education?.length > 0;
      case "experience": return portfolio.experience?.length > 0;
      case "certificates": return portfolio.certificates?.length > 0;
      case "social": return Object.values(portfolio.socialLinks || {}).some(Boolean);
      default: return false;
    }
  };

  const handleSave = async (patch) => {
    try {
      await updatePortfolio(patch);
      toast.success("Saved ✨");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const FormComponent = FORM_MAP[active];

  return (
    <div className="min-h-screen pt-16">
      {/* Mobile tab bar (bottom sticky) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur border-t flex" style={{ background: "var(--bg-sec)", borderColor: "var(--border)" }}>
        {["edit", "preview"].map((t) => (
          <button
            key={t}
            onClick={() => setMobileTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: mobileTab === t ? "var(--neon)" : "var(--text-sec)" }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_1fr] gap-4 px-4 py-6">
        {/* Vertical stepper */}
        <aside className={`${mobileTab === "edit" ? "block" : "hidden"} md:block`}>
          <div className="card p-3 sticky top-20">
            <ul className="space-y-1">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = active === s.id;
                const done = isCompleted(s.id);
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => setActive(s.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition"
                      style={{
                        background: isActive ? "var(--bg-deep)" : "transparent",
                        color: isActive ? "var(--text)" : "var(--text-sec)",
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                        style={{
                          background: done ? "var(--neon)" : isActive ? "var(--primary)" : "var(--bg)",
                          color: done || isActive ? "#fff" : "var(--text-sec)",
                        }}
                      >
                        {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                      </span>
                      <Icon className="w-4 h-4" />
                      <span className="truncate">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Form side */}
        <section className={`${mobileTab === "edit" ? "block" : "hidden"} md:block`}>
          <div className="card p-5 md:sticky md:top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold capitalize">{active}</h2>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-xs px-3 py-1.5 rounded-lg border"
                style={{ borderColor: "var(--border)" }}
              >
                Dashboard
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                {FormComponent && (
                  <FormComponent
                    data={portfolio?.[active === "social" ? "socialLinks" : active]}
                    onSave={handleSave}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Live preview */}
        <section className={`${mobileTab === "preview" ? "block" : "hidden"} lg:block`}>
          <div className="sticky top-20">
            <div className="flex justify-center mb-3">
              <DeviceToggle device={device} setDevice={setDevice} />
            </div>
            <LivePreview portfolio={portfolio} device={device} />
          </div>
        </section>
      </div>
    </div>
  );
}