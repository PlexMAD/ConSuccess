"use client";

import { apiURL } from "@/shared/api/config";
import { Role, User } from "@/shared/types/users";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const ROLES: Role[] = ["USER", "MODERATOR", "ADMIN"];

const ROLE_LABELS: Record<Role, string> = {
  USER: "Пользователь",
  MODERATOR: "Модератор",
  ADMIN: "Администратор",
};

const ROLE_COLORS: Record<Role, string> = {
  USER: "bg-slate-100 text-slate-600",
  MODERATOR: "bg-blue-50 text-primary",
  ADMIN: "bg-primary text-white",
};

export function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState<number | null>(null);

  const updateRole = async (id: number, role: Role) => {
    setLoading(id);
    try {
      const res = await fetch(`/api/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Ошибка");
      }

      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
      toast.success("Роль обновлена");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось обновить роль");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-md overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="hidden sm:table-cell text-left py-3 px-5 font-medium text-slate-400 w-16">
                ID
              </th>
              <th className="text-left py-3 px-4 sm:px-5 font-medium text-slate-400">
                Пользователь
              </th>
              <th className="text-left py-3 px-4 sm:px-5 font-medium text-slate-400">
                Роль
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
              >
                <td className="hidden sm:table-cell py-3.5 px-5 text-slate-400 tabular-nums">{user.id}</td>
                <td className="py-3.5 px-4 sm:px-5">
                  <div className="flex items-center gap-2.5">
                    {user.avatar ? (
                      <Image
                        src={`${apiURL}${user.avatar}`}
                        alt={user.username}
                        width={32}
                        height={32}
                        unoptimized
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500 shrink-0">
                        {user.username[0].toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium text-slate-900 truncate">{user.username}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 sm:px-5">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                    <span className={`self-start sm:self-auto shrink-0 rounded-lg px-2.5 py-0.5 text-xs font-semibold sm:w-32 sm:text-center ${ROLE_COLORS[user.role]}`}>
                      {ROLE_LABELS[user.role]}
                    </span>
                    <select
                      value={user.role}
                      disabled={loading === user.id}
                      onChange={(e) => updateRole(user.id, e.target.value as Role)}
                      className="max-sm:w-max sm:w-44 border border-slate-200 rounded-lg px-2 py-1 text-sm bg-white disabled:opacity-40 cursor-pointer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r]}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}