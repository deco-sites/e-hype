import { useEffect, useState } from "preact/hooks";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format textarea
   */
  description?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @format color-input
   */
  textColor?: string;
}

export default function GitHubUserProfile({
  title = "GitHub User Profile",
  description = "Displaying data from the GitHub API",
  backgroundColor = "#f0f0f0",
  textColor = "#333333",
}: Props) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/zCastleM")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data: GitHubUser) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div
      class="p-6 rounded-lg shadow-lg"
      style={{ backgroundColor, color: textColor }}
    >
      <h2 class="text-3xl font-bold mb-4">{title}</h2>
      <p class="mb-6">{description}</p>

      {loading && <p>Loading...</p>}
      {error && <p class="text-red-500">Error: {error}</p>}
      {user && (
        <div class="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            class="w-32 h-32 rounded-full"
          />
          <div>
            <h3 class="text-2xl font-semibold">{user.name || user.login}</h3>
            <p class="text-lg mb-2">{user.bio}</p>
            <div class="flex gap-4">
              <span>Repos: {user.public_repos}</span>
              <span>Followers: {user.followers}</span>
              <span>Following: {user.following}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}