import ProfileCard from "@/components/profile-card";
import { render, screen } from "@testing-library/react";

describe("ProfileCard", () => {
  beforeEach(() => {
    render(
      <ProfileCard
        avatarUrl="https://cdn.discordapp.com/avatars/123456789/123456789.png"
        ign="Test IGN"
        discordTag="Test#1234"
        teamName="Test Team"
        teamAvatar="https://cdn.discordapp.com/avatars/123456789/123456789.png"
      />
    );
  });
  it("renders the IGN", () => {
    expect(screen.getByText("Test IGN")).toBeInTheDocument();
  });
  it("renders the Discord tag", () => {
    expect(screen.getByText("Test#1234")).toBeInTheDocument();
  });
  it("renders the team name", () => {
    expect(screen.getByText("Test Team")).toBeInTheDocument();
  });
});
