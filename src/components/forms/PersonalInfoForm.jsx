import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function PersonalInfoForm({ data, onSave }) {
  const [form, setForm] = useState({
    profilePhoto: "",
    fullName: "",
    professionalTitle: "",
    location: "",
    shortBio: "",
    aboutMe: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data) setForm({ ...form, ...data });
  }, [data]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const uploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/upload", fd);
      setForm((f) => ({ ...f, profilePhoto: data.url }));
      toast.success("Photo uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {form.profilePhoto ? (
          <img src={form.profilePhoto} alt="" className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full" style={{ background: "var(--bg-deep)" }} />
        )}
        <label className="px-4 py-2 rounded-lg border text-sm cursor-pointer" style={{ borderColor: "var(--border)" }}>
          {uploading ? "Uploading..." : "Upload Photo"}
          <input type="file" accept="image/*" hidden onChange={uploadPhoto} />
        </label>
      </div>

      <input placeholder="Full Name" value={form.fullName} onChange={set("fullName")} className="w-full px-3 py-2.5 rounded-lg border bg-transparent" style={{ borderColor: "var(--border)" }} />
      <input placeholder="Professional Title" value={form.professionalTitle} onChange={set("professionalTitle")} className="w-full px-3 py-2.5 rounded-lg border bg-transparent" style={{ borderColor: "var(--border)" }} />
      <input placeholder="Location" value={form.location} onChange={set("location")} className="w-full px-3 py-2.5 rounded-lg border bg-transparent" style={{ borderColor: "var(--border)" }} />
      <textarea placeholder="Short Bio (1-2 lines)" rows={2} value={form.shortBio} onChange={set("shortBio")} className="w-full px-3 py-2.5 rounded-lg border bg-transparent resize-none" style={{ borderColor: "var(--border)" }} />
      <textarea placeholder="About Me (detailed)" rows={4} value={form.aboutMe} onChange={set("aboutMe")} className="w-full px-3 py-2.5 rounded-lg border bg-transparent resize-none" style={{ borderColor: "var(--border)" }} />

      <button
        onClick={() => onSave({ personalInfo: form })}
        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-medium"
      >
        Save & Continue
      </button>
    </div>
  );
}