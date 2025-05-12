
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        {isAuthenticated ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-auth-blue">
              Welcome, {user?.name}!
            </h1>
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Email:</span>{" "}
                {user?.email}
              </div>
              <div>
                <span className="font-semibold text-gray-700">User ID:</span>{" "}
                {user?.id}
              </div>
            </div>
            <p className="mb-6 text-gray-600 text-center">
              You have successfully logged in to the demo authentication system.
              This is a protected route that only authenticated users can access.
            </p>
            <Button 
              className="w-full py-2 bg-auth-dark-blue hover:bg-auth-blue transition-colors"
              onClick={logout}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2 text-center text-auth-blue">
              Authentication Demo
            </h1>
            <p className="mb-6 text-gray-600 text-center">
              A full-stack authentication system with React, Tailwind CSS, and simulated backend.
            </p>
            <div className="space-y-4">
              <Button 
                className="w-full py-6 bg-auth-blue hover:bg-auth-dark-blue transition-colors"
                onClick={() => window.location.href = "/login"}
              >
                Login
              </Button>
              <Button 
                className="w-full py-6 bg-white text-auth-blue border border-auth-blue hover:bg-gray-50 transition-colors"
                onClick={() => window.location.href = "/register"}
                variant="outline"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
