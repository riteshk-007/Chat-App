import Chat from "./Chat";
import UserList from "./UserList";

function Home() {
  return (
    <div className=" w-full md:w-3/4 h-[98vh] md:h-4/5 bg-black/40 md:rounded-xl overflow-hidden flex items-center justify-center md:shadow-md">
      <UserList />
      <Chat />
    </div>
  );
}

export default Home;
