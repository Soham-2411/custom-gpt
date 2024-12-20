import Query from "./components/Query"
import Response from "./components/Response"

// import './index.css'
function App() {

  return (
    <>
      <div className='h-screen w-full flex flex-row'>
        <aside className="h-screen w-60 text-center p-4 bg-sidebar">
          <h1 className="text-xl">Chats</h1>
          <div className="text-left pl-3 mt-5 py-3 border 
          rounded-lg border-gray-600 hover:bg-gray-700 
          transition ease-in hover:cursor-pointer">
            <p className="text-sm">+ New chat</p>
          </div>
        </aside>
        <section className="flex-1 relative">
          <div className="h-full overflow-y-auto">
            <div className="">
              <Query text="Lorem ipsum odor amet, consectetuer adipiscing elit. Sem at nisi netus ad ipsum quisque efficitur elit. Nostra class varius, ridiculus posuere velit vitae nec. Sagittis quis diam aliquet vel gravida primis. Torquent donec eleifend risus elit metus curae. Mi primis urna natoque porttitor sit tristique ac elementum."></Query>
              <Response text="Lorem ipsum odor amet, consectetuer adipiscing elit. Sem at nisi netus ad ipsum quisque efficitur elit. Nostra class varius, ridiculus posuere velit vitae nec. Sagittis quis diam aliquet vel gravida primis. Torquent donec eleifend risus elit metus curae. Mi primis urna natoque porttitor sit tristique ac elementum."></Response>
            </div>
          </div>

          {/* Textbox with Send Button */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4 w-[800px] mb-10">
            <div className="bg-input rounded-3xl flex items-center flex-row justify-between">
              <textarea
                className="flex-1 p-3 rounded-3xl bg-input focus:outline-none resize-none"
                placeholder="Type a message..."
              >
              </textarea>
              <button className="p-3 mr-2 bg-white hover:bg-gray-300 text-black rounded-full hover:cursor-pointer transition ease-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 17a1 1 0 01-1-1V5.414L5.707 9.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 5.414V16a1 1 0 01-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>


            </div>
          </div>
        </section>
      </div>


    </>
  )
}

export default App
