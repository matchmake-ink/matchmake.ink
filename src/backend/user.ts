import { Session } from "@supabase/supabase-js";
import { SessionSingleton } from "./session";
import { backendClient } from "./client";

export enum PROFILE_STATUS {
  LOADING,
  LOGGED_IN,
  LOGGED_OUT,
}

export enum TEAM_STATUS {
  LOADING,
  FREE_AGENT,
  ON_TEAM,
}

export class User {
  profile: Profile = new Profile();
  team: Team = new Team();

  constructor() {
    const sessionSingleton = SessionSingleton.getInstance();

    sessionSingleton.addSessionListener((_event, session) => {
      this.sessionChanged(session);
    });
  }

  sessionChanged(session: Session | null) {
    if (session === null) {
      this.profile.update("");
      this.team.update("");
    } else {
      this.profile.update(session.user.id);
      this.team.update(session.user.id);
    }
  }
}

class Profile {
  private status: PROFILE_STATUS = PROFILE_STATUS.LOADING;
  private avatarUrl = "";
  private email = "";
  private discordId = "";
  private discordTag = "";
  private friendCode = "";
  private team = "";

  // getters and setters
  getAvatarUrl(): string {
    return this.avatarUrl;
  }

  getEmail(): string {
    return this.email;
  }

  getDiscordId(): string {
    return this.discordId;
  }

  getDiscordTag(): string {
    return this.discordTag;
  }

  getFriendCode(): string {
    return this.friendCode;
  }
  setFriendCode(friendCode: string) {
    this.friendCode = friendCode;
  }

  getTeam(): string {
    return this.team;
  }

  getStatus(): PROFILE_STATUS {
    return this.status;
  }

  update(id: string) {
    backendClient
      .from("profiles")
      .select("*")
      .eq("id", id)
      .then(({ data, error }) => {
        if (error) {
          this.status = PROFILE_STATUS.LOGGED_OUT;
          console.log(error);
          return;
        }

        if (data) {
          this.status = PROFILE_STATUS.LOGGED_IN;
          this.avatarUrl = data[0].avatar_url ?? "";
          this.email = data[0].email ?? "";
          this.discordId = data[0].discord_id ?? "";
          this.discordTag = data[0].discord_tag ?? "";
          this.friendCode = data[0].friend_code ?? "";
        }
      });
  }

  upsert() {
    backendClient
      .from("profiles")
      .upsert({
        id: this.discordId,
        avatar_url: this.avatarUrl,
        email: this.email,
        discord_id: this.discordId,
        discord_tag: this.discordTag,
        friend_code: this.friendCode,
      })
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }

        if (data) {
          console.log(data);
        }
      });
  }
}

class Team {
  private status: TEAM_STATUS = TEAM_STATUS.LOADING;
  private teamTag = "";
  private memberIds: string[] = [];
  private memberNames: string[] = [];
  private discordServerInvite = "";
  private rating = 0;
  private rd = 0;
  private vol = 0;

  // getters and setters
  getTeamTag(): string {
    return this.teamTag ?? "";
  }
  getMemberIds(): string[] {
    return this.memberIds;
  }
  getMemberNames(): string[] {
    return this.memberNames;
  }
  getDiscordServerInvite(): string {
    return this.discordServerInvite;
  }
  getRating(): number {
    return this.rating;
  }
  getRd(): number {
    return this.rd;
  }
  getVol(): number {
    return this.vol;
  }
  getStatus(): TEAM_STATUS {
    return this.status;
  }

  update(teamTag: string) {
    this.teamTag = teamTag;
    backendClient
      .from("teams")
      .select("*")
      .eq("team_tag", teamTag)
      .then(({ data, error }) => {
        if (error) {
          this.status = TEAM_STATUS.FREE_AGENT;
          return;
        }

        this.status = TEAM_STATUS.ON_TEAM;
        this.discordServerInvite = data[0].discord_server_invite ?? "";
        this.rating = data[0].rating;
        this.rd = data[0].rd;
        this.vol = data[0].volitility;

        backendClient
          .from("profiles")
          .select("*")
          .eq("team", this.teamTag)
          .then(({ data, error }) => {
            // errors should not happen here
            if (error) {
              console.log(error);
              return;
            }

            if (data) {
              this.memberIds = data.map((profile) => profile.id);
              this.memberNames = data.map(
                (profile) => profile.discord_tag ?? "UnknownUser"
              );
            }
          });
      });
  }

  upsert() {
    if (this.teamTag === "") {
      return;
    }
    backendClient.from("teams").upsert({
      tag: this.teamTag,
      member_ids: this.memberIds,
      discord_server_invite: this.discordServerInvite,
    });
  }
}
