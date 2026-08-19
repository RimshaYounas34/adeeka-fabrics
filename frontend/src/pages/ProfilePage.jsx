import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("adeeka_user"));

  const handleLogout = () => {
    localStorage.removeItem("adeeka_user");
    navigate("/login");
  };

  return (
    <section className="min-h-screen bg-[#f5eee4] py-16 px-6">

      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-[#b18442] text-xs uppercase tracking-[0.3em]">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl text-[#17110d] mt-2">
            My Profile
          </h1>
        </div>

        <div className="bg-white p-8 shadow-sm">

          <h2 className="font-serif text-2xl text-[#17110d] mb-6">
            Account Information
          </h2>

          <div className="border-b border-[#e2d8cc] pb-4 mb-4">
            <p className="text-xs text-[#75695e] uppercase">
              Email
            </p>

            <p className="text-[#17110d] mt-1">
              {user?.email || "Not logged in"}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/orders"
              className="
                bg-[#17110d]
                text-[#f5eee4]
                px-6
                py-3
                text-xs
                uppercase
                tracking-widest
                hover:bg-[#b18442]
                transition
              "
            >
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              className="
                border
                border-[#17110d]
                text-[#17110d]
                px-6
                py-3
                text-xs
                uppercase
                tracking-widest
                hover:bg-[#17110d]
                hover:text-white
                transition
              "
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProfilePage;