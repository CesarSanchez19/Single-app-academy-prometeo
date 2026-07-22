import { useAuth } from "@hooks/useAuth.js";

export const AdminHome = () => {
  const { user } = useAuth();
  const fullName = user ? `${user.name} ${user.lastname}` : "User";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800">Welcome {fullName}</h1>
      <p className="mt-2 text-slate-600">This is your admin dashboard.</p>
    </div>
  );
};
