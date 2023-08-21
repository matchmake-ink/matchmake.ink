# matchmake.ink
[Join the discord!](https://discord.gg/MtnRydHhAt)
matchmake.ink is a competitive matchmaking and rating system for splatoon 3 teams. We plan to provide:
- A matchmaking server
- A team rating system with Glicko-2
- Tournaments and Leaderboards

We are in the very early stages of development and working on the systems for allowing users to build teams and invite each other.

# Contributing
If you have any questions about contributing, feel free to dm @firesquid6 on discord.

## Artists
We will need help with art! Look for issues with the tag `needs: art` and leave a comment. When you're done, you can either tag @firesquid6 me on the [discord server](https://discord.gg/MtnRydHhAt), or make a pull request (if that's something you know how to do). 

Please note that your art will be published under the [GPL3.0 license](https://www.gnu.org/licenses/quick-guide-gplv3.html)

## Developers
matchmake.ink is built with:
- Next.JS
- Typescript
- Firebase
- Vitest

You can start by working on issues tagged with `good first issue`, although that isn't required. Most issues have pretty good descriptions, but leave a comment or contact @firesquid6 if you have any questions.

To start development you need to:
1. Clone the repo wherever you want
2. run `npm install`
3. run `npm run test` to watch your unit tests
4. run `npm run dev` or in VSCode use the "Run and Debug" feature to start the dev server.

## TO's
If you're a tournament organizer, there's nothing for you right now. Stay tuned for opportunities in the future!

Writing unit tests is encouraged, but not required. Do not worry about submitting "bad code." We welcome people with any amount of experience and will do our best to help you. 

If you'd like to work on any API, you'll need a service key to put in your `.env.local` file. I'm not gonna just publish these on the internet, so dm @firesquid6 if you'd like one of them. You shouldn't need one if you're just working on frontend stuff. 

If you're a python developer, take a look at [warden](https://github.com/matchmake-ink/warden), our matchmaking server being built in flask.
