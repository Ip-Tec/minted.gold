

function NewsLetter() {
    return (
        <div className="p-3 flex justify-center items-center w-full">
          <form className="flex p-1">
            <input
              className="w-2/3 px-5 py-2 mr-2 border-b-2 outline-0 outline-offset-0 border-b-yellow-600 "
              type="email"
              placeholder="Subscribe email"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-yellow-600 text-white border hover:border-yellow-600 hover:bg-transparent hover:text-black"
            >
              Subscribe
            </button>
          </form>
        </div>
      );
}

export default NewsLetter