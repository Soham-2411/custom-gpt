
const Sidebar = () => {
    return (
        <aside className="h-screen w-60 text-center p-4 bg-sidebar">
            <h1 className="text-xl">Chats</h1>
            <div className="text-left pl-3 mt-5 py-3 border rounded-lg border-gray-600 hover:bg-gray-300 hover:bg-opacity-10 transition ease-in hover:cursor-pointer">
                <p className="text-sm">+ New chat</p>
            </div>
        </aside>
    )
}

export default Sidebar