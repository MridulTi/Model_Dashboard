import axios from 'axios'
import React, { useEffect, useState ,useRef} from 'react'
import {FaBolt, FaCheckCircle, FaCloudUploadAlt, FaImages, FaRegCalendar, FaRegObjectGroup, FaUpload, FaUser} from "react-icons/fa"
import {GrStatusGood} from "react-icons/gr"
import {FaFaceMehBlank} from "react-icons/fa6"
import { socket } from '../socket'
import { useUserContext } from '../Context/UserContext'

function Dashboard() {

    const {user}=useUserContext()
    const [modal,setModal]=useState(false)
    const [result,setResult]=useState(false)
    const [resultURL,setResultURL]=useState({})
    const [query,setQuery]=useState("")
    const [progressList, setProgressList] = useState(["Idle"]);
    const {handleCloseModal,handleOpenModal,isModalOpen,errorMessage}=useUserContext()
    

    function downloadVideo(videoUrl) {
        const link = document.createElement('a');
        link.href = videoUrl;
        link.setAttribute('download', 'processed_video.mp4');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);
    useEffect(()=>{
        axios.get("/api/v1/mridul/").then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
        socket.on('connect',()=>{
            console.log("Client Connected")
        })
        socket.on("progress",message=>{
            setProgressList(prevList => [...prevList, message.data]);
        })

    },[])
    function closeModal(){
        setResult(false)
        setResultURL(false)
    }

    function retrieveResult(e){
        e.preventDefault();
        console.log(fileName)
        axios.post(`/api/v1/mridul/dashboard?${query}`,{'img':fileName},{
            headers:{
                'Content-Type':"multipart/form-data"
            }
        }).then(res=>{
            if (res.status !== 200 && res.status !== 201) {
                handleOpenModal('An error occurred: ' + res.statusText);
            }
            console.log(res.data.data)
            setResultURL(res.data.data)
            setModal(false)
            setResult(true)

        })
        .catch(err=>{
            handleOpenModal('An error occurred: ' + err);
            
        })
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFileName(file);
        }
    };
    
    const handleIconClick = () => {
    fileInputRef.current.click();
    };
    

    return (
        <div>
            <div class="pl-20 lg:pl-24 w-screen h-full bg-neutral-200">
                <nav class="w-full h-12 px-4 lg:px-12 bg-neutral-200 flex justify-between items-center">
                    <div class="flex items-center gap-2 text-lg lg:text-xl">
                    <FaRegCalendar/>
                        <h1 class="text-neutral-500 italic" id="date"></h1>
                        <div id="progress" class="italics"></div>
                    </div>
                    <div class="text-base lg:text-2xl flex gap-4 lg:gap-12 items-center">
                        <button class="text-white bg-black rounded-lg px-3 lg:px-5 py-2 text-xs lg:text-sm flex gap-2 items-center">
                            <FaBolt/> Upgrade
                        </button>
                        <p className='text-sm flex gap-2 items-center'><FaUser/>{user.userName}</p>
                    </div>
                </nav>

                <div class="h-auto lg:h-[92vh] flex flex-col lg:flex-row gap-6 py-5 px-5 lg:px-10">
                    <div class="flex flex-col gap-6 w-full lg:w-1/4 h-full">
                        <h1 class="text-2xl font-semibold">Dashboard</h1>
                        <div class="bg-white rounded-2xl w-full p-5">
                            <h1 class="text-4xl font-medium">Hi, {user.firstName}</h1>
                            <p class="text-lg text-neutral-400 py-5">What are we doing today?</p>
                        </div>
                        <h1 class="text-2xl font-semibold">Progress Updates:</h1>
                        <div class="bg-white rounded-2xl w-full overflow-y-scroll scroll-hidden h-full p-5">
                            <ul>
                            {progressList.slice().reverse().map((progress, index) => (
                                <li className='flex gap-2 items-center py-2 font-semibold' key={index}><FaCheckCircle className="text-green-700"/> {progress}</li>
                            ))}
                            </ul>
                        </div>
                    </div>

                    <div class="w-full h-full">
                        <div class="w-full h-full md:py-12 grid place-items-center bg-white rounded-2xl">
                            <div class="text-center px-5">
                                <h1 class="text-4xl lg:text-6xl font-bold">Welcome to AI Dashboard!</h1>
                                <p class="text-lg lg:text-xl text-neutral-400">Get started by choosing from the following AI models. Not sure where to start?</p>
                                <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 py-10">
                                    <button
                                        onClick={()=>{
                                            setModal(true)
                                            setQuery("predict_img")
                                        }}
                                        class="open-modal p-3 lg:p-5 text-lg lg:text-xl font-semibold border-2 border-neutral-200 hover:bg-neutral-200 rounded-xl flex gap-4 lg:gap-6 items-center"><FaImages  className='text-3xl text-blue-500'/> Image Segmentation</button>
                                    <button
                                        onClick={()=>{
                                            setModal(true)
                                            setQuery("predict_video")
                                        }}
                                        class="open-modal p-3 lg:p-5 text-lg lg:text-xl font-semibold border-2 border-neutral-200 hover:bg-neutral-200 rounded-xl flex gap-4 lg:gap-6 items-center"><FaRegObjectGroup  className='text-3xl text-orange-500'/> Object Detection in Video</button>
                                    <button
                                        onClick={()=>{
                                            setModal(true)
                                            setQuery("predict_df")
                                        }}
                                        class="open-modal p-3 lg:p-5 text-lg lg:text-xl font-semibold border-2 border-neutral-200 hover:bg-neutral-200 rounded-xl flex gap-4 lg:gap-6 items-center"><FaFaceMehBlank className='text-3xl text-yellow-300'/> DeepFake!</button>
                                    {/* <button
                                        class="open-modal p-3 lg:p-5 text-lg lg:text-xl font-semibold border-2 border-neutral-200 hover:bg-neutral-200 rounded-xl flex gap-4 lg:gap-6 items-center"><i
                                            class="fa fa-fire text-3xl lg:text-4xl text-yellow-400" aria-hidden="true"
                                            data-action="/api/v1/mridul/image-segmentation"></i>Real-time
                                        Trespassing Detection</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {result&&<div id="Image modal"
                class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full grid place-items-center">
                {console.log(resultURL.type)}
                <div class="relative mx-auto p-5 border w-11/12 md:w-3/4 lg:w-[50vw] shadow-lg rounded-md bg-white">
                    <div class="mt-3 text-center grid place-items-center">
                        {resultURL.type=="image" &&<img id='resultImage' src={resultURL.resultImage} class="max-w-full h-auto" />}

                        {resultURL.type=="video" &&
                        <div>
                            <h1 className='font-bold text-2xl'>{resultURL.resultImage}</h1>
                            <h2>The video can be found in backend/images/results .</h2>
                            {downloadVideo(resultURL.url)}
                        </div>
                        }
                    </div>
                    <button onClick={closeModal} id="go-back" class="p-2 rounded-lg my-2 w-full bg-neutral-500 hover:bg-blue-500">Go Back</button>
                </div>
            </div>}


            {modal && <div id="modal"
                class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full grid place-items-center">
                <div class="relative mx-auto p-5 border w-11/12 md:w-3/4 lg:w-[50vw] shadow-lg rounded-md bg-white">
                    <div class="mt-3 text-center">
                        <div class="p-5 lg:p-10 mt-5 bg-stone-100 rounded-2xl flex flex-col items-center">
                            <h1 class="text-lg lg:text-xl font-bold">File Upload</h1>
                            <p class="text-sm lg:text-base tracking-tighter">Please upload images or video file below. <i
                                class="text-red-600">Make sure the file
                                size is under 300MB</i></p>
                            <form  onSubmit={retrieveResult} id="upload-form" method="POST" enctype="multipart/form-data"
                                class="border border-dashed mt-5 lg:mt-10 w-full border-4 border-gray-300 rounded-xl flex flex-col items-center py-10 lg:py-24">
                                <input type='file' ref={fileInputRef} onChange={handleFileUpload}/>
                                <FaCloudUploadAlt  onClick={handleIconClick} className='text-7xl bg-neutral-300 p-4 rounded-full '/>

                                <h1 class="font-bold text-lg lg:text-2xl text-blue-500">Drop Your Files Here</h1>
                                <p class="tracking-tighter text-sm lg:text-base">or browse files from your computer</p>
                                <div class="items-center px-4 py-3 w-full">
                                    <button id="close-modal"
                                        class="px-4 py-2 bg-gray-500 text-white text-sm lg:text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>}

        </div>
    )
}
export default Dashboard