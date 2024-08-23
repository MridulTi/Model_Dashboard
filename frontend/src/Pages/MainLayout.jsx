import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCog, FaHome } from 'react-icons/fa'
import { RiLogoutBoxRFill } from "react-icons/ri"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/UserContext'
import ErrorModal from '../Components/Error'

function MainLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname;

    const [Name, setName] = useState("DASHBOARD")
    const {handleCloseModal,handleOpenModal,isModalOpen,errorMessage}=useUserContext()
    
    useEffect(() => {
        if (currentPath.includes("SETTINGS")) {
            setName("SETTINGS")
        } else {
            setName("DASHBOARD")
        }
        console.log(Name)
    }, [])
    function Logout() {
        axios.post("api/v1/auth/logout").then(res => {
            if (res.status !== 200 && res.status !== 201) {
                handleOpenModal('An error occurred: ' + res.statusText);
            }
            navigate("/")
        })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <div class="flex w-full min-h-screen">
                <nav class="z-10 w-20 fixed left-0 h-screen text-xl lg:text-2xl bg-stone-900 py-6 flex flex-col justify-between">
                    <div class="flex flex-col place-items-center text-neutral-200 gap-6">
                        <h3 class="font-bold text-lg text-center flex flex-col place-items-center text-blue-500">
                            <img class="w-10 lg:w-14"
                                src="https://upload.wikimedia.org/wikipedia/en/0/01/CDOT_logo.gif" />C-DOT</h3>
                        <FaHome className={`text-6xl rounded-lg hover:bg-neutral-500 p-3 ${Name === "DASHBOARD" ? "bg-neutral-500" : ""}`} />
                    </div>
                    <div class="grid divide divide-y-2 divide-neutral-200 place-items-center">
                        <FaCog className={`text-6xl my-2 text-neutral-200 rounded-lg hover:bg-neutral-500 p-3 ${Name === "SETTINGS" ? "bg-neutral-500" : ""}`} />
                        <button onClick={Logout} class="my-2 text-4xl text-red-600 p-3 my-2 hover:bg-red-200 rounded-lg" aria-hidden="true"><RiLogoutBoxRFill /></button>
                    </div>
                </nav>

                <Outlet/>
                
            </div>
            <ErrorModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default MainLayout