import { getUserPropType } from "../types"
import Avatar from '@mui/material/Avatar';
import { motion } from "framer-motion";
import { getUserPostDocId } from "../services/firebase";

const Artist = ({ user }: getUserPropType) => {
    const svgVariant = {
        hover: {
            scale: 1.2
        }
    }
    const handleExpand = () => {
        const postDocId = getUserPostDocId(user.userEmail)
        console.log(postDocId);
    }
    return (
        <div className="border-2 w-full flex items-center px-3 py-5 justify-between font-stix">
            <div className="flex items-center">
                <Avatar className="mr-2" alt="user avatar" src={user.profileImg} />
                <span>{user.username}</span>
            </div>
            <div className="flex items-center">
                <div className="flex flex-col items-center mr-3">
                    <img className="w-7" src="/images/followers.png" alt="followers" />
                    <span>{user.followers.length}</span>
                </div>
                <motion.div
                    className="mr-3"
                    variants={svgVariant}
                    whileHover="hover">
                    <svg
                        className="w-6"
                        x="0px" y="0px"
                        viewBox="0 0 490.4 490.4" >
                        <g>
                            <g>
                                <path d="M222.5,453.7c6.1,6.1,14.3,9.5,22.9,9.5c8.5,0,16.9-3.5,22.9-9.5L448,274c27.3-27.3,42.3-63.6,42.4-102.1
                                    c0-38.6-15-74.9-42.3-102.2S384.6,27.4,346,27.4c-37.9,0-73.6,14.5-100.7,40.9c-27.2-26.5-63-41.1-101-41.1
                                    c-38.5,0-74.7,15-102,42.2C15,96.7,0,133,0,171.6c0,38.5,15.1,74.8,42.4,102.1L222.5,453.7z M59.7,86.8
                                    c22.6-22.6,52.7-35.1,84.7-35.1s62.2,12.5,84.9,35.2l7.4,7.4c2.3,2.3,5.4,3.6,8.7,3.6l0,0c3.2,0,6.4-1.3,8.7-3.6l7.2-7.2
                                    c22.7-22.7,52.8-35.2,84.9-35.2c32,0,62.1,12.5,84.7,35.1c22.7,22.7,35.1,52.8,35.1,84.8s-12.5,62.1-35.2,84.8L251,436.4
                                    c-2.9,2.9-8.2,2.9-11.2,0l-180-180c-22.7-22.7-35.2-52.8-35.2-84.8C24.6,139.6,37.1,109.5,59.7,86.8z"/>
                            </g>
                        </g>
                    </svg>
                </motion.div>
                <img className="w-6" src="/images/down-arrow.png" alt="down arrow" onClick={handleExpand} />
            </div>    
        </div>
    )
}

export default Artist