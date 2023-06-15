export function InvitePlayer() {
  return (
    <div>
      <h2>Invite Player</h2>
      <form>
        <label htmlFor="discord-username">Discord Username</label>
        <input id="discord-username" type="text" />
        <button type="submit">Invite</button>
      </form>
    </div>
  );
}
