import React from "react";
import { useNavigate } from "react-router-dom";

const TestRole = () => {

    const navigate = useNavigate();

    const loginAs = (role, path) => {

        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
                role: role
            })
        );

        navigate(path);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617]">

            <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-xl">

                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    CarVault
                </h1>

                <p className="text-slate-400 text-center mb-6">
                    Select a role to test
                </p>

                <div className="space-y-4">

                    <button
                        onClick={() =>
                            loginAs("customer", "/customer/vehicles")
                        }
                        className="btn btn-primary w-full"
                    >
                        Customer
                    </button>

                    <button
                        onClick={() =>
                            loginAs("service-center", "/service-center/dashboard")
                        }
                        className="btn btn-secondary w-full"
                    >
                        Service Center
                    </button>

                    <button
                        onClick={() =>
                            loginAs("admin", "/admin/dashboard")
                        }
                        className="btn btn-accent w-full"
                    >
                        Admin
                    </button>

                </div>

            </div>

        </div>
    );
};

export default TestRole;