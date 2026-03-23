"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "@/lib/i18n";
import { Camera, User, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string | null;
}

export default function ProfilePage() {
  const t = useTranslations("profile");
  const locale = useLocale();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Demo User",
    email: "user@example.com",
    bio: "Learning Claude Code and building AI agents",
    avatar: null,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, avatar: reader.result as string });
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setProfile(editForm);
    setIsSaving(false);
    setIsEditing(false);
    setSaveMessage(t("save_success"));
    
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditForm({ ...editForm, [field]: value });
    if (!isEditing) setIsEditing(true);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>
      
      {/* Avatar Section */}
      <div className="mb-8 flex flex-col items-center">
        <div 
          className="group relative cursor-pointer"
          onClick={handleAvatarClick}
        >
          <div className="h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800">
            {editForm.avatar ? (
              <img 
                src={editForm.avatar} 
                alt="Avatar" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User size={48} className="text-zinc-400" />
              </div>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera size={24} className="text-white" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {t("click_to_upload")}
        </p>
      </div>

      {/* Profile Form */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("name")}
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn(
                "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600",
                "transition-colors"
              )}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("email")}
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={cn(
                "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600",
                "transition-colors"
              )}
            />
          </div>

          {/* Bio Field */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("bio")}
            </label>
            <textarea
              value={editForm.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={4}
              className={cn(
                "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600",
                "transition-colors resize-none"
              )}
            />
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                  "flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white",
                  "hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
                  "disabled:opacity-50 transition-colors"
                )}
              >
                <Save size={16} />
                {isSaving ? t("saving") : t("save")}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className={cn(
                  "flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  "disabled:opacity-50 transition-colors"
                )}
              >
                <X size={16} />
                {t("cancel")}
              </button>
            </div>
          )}

          {/* Save Success Message */}
          {saveMessage && (
            <div className="rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
              {saveMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
