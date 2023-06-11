import { Form, Link } from "@remix-run/react";

const NavBar = ({ user }) => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-white ml-2 text-lg font-semibold">
                Book Nook
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Log out
                </button>
              </Form>
            ) : (
              <Form action="/login" method="post">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Log in
                </button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
