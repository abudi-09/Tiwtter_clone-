import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const CreatePost = ({ authUser }) => {
  const [text, setText] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef(null);
  const queryClient = useQueryClient();
  if (!authUser) return null;

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, imgFile }) => {
      const formData = new FormData();
      formData.append("text", text);
      if (imgFile) {
        formData.append("image", imgFile);
      }

      const res = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      return data;
    },

    onSuccess: () => {
      setText("");
      setImgFile(null);
      imgRef.current.value = null;
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, imgFile });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
    }
  };

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img
            src={authUser?.profileImg || "/avatar-placeholder.png"}
            alt="Profile"
          />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none border-gray-800"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {imgFile && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImgFile(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={URL.createObjectURL(imgFile)}
              alt="Preview"
              className="w-full mx-auto h-72 object-contain rounded"
            />
          </div>
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />
          <button
            type="submit"
            className="btn btn-primary rounded-full btn-sm text-white px-4"
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
};

export default CreatePost;
