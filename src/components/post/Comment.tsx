import axios from "axios"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import UserContext from "../../context/user"
import { getCommentInfinite, getCommentsDocId, getUserByUserId } from "../../services/firebase"
import { commentType, getUserType } from "../../types"
import CommentRow from "./CommentRow"

interface commentProps {
    postDocID : string
}

const Comment: React.FC<commentProps> = ({ postDocID }) => {

    const { user } = useContext(UserContext)
    const [text, setText] = useState("")
    const [comments, setComments] = useState<commentType[]>([])
    const [commentsDocID, setCommentsDocID] = useState<string[]>([])
    const enterRef = useRef<HTMLDivElement | null>(null)
    const [commentUser, setCommentUser] = useState<getUserType>({} as getUserType)
    const [key, setKey] = useState(0)

    const handleKeypress = (e: any) => {
    if (e.key === 'Enter') {
        enterRef.current?.click()
        }
    };

    useEffect(() => {
        getCommentsDocId(postDocID).then((res: any) => {
            setCommentsDocID(res.reverse())
        })

        getUserByUserId(user.uid).then((res: any) => {
            setCommentUser(res)
        })

    }, [])
    
    const handleScroll = useCallback(() => {
        getCommentInfinite(commentsDocID, key).then((res) => {
            
            let tmp = res.docs.map((doc) => doc.data())
                .sort((a, b) => { return b.dateCreated - a.dateCreated })
            setComments((origin: any) => {
                return [...origin, ...tmp]
            })
            setKey((origin)=>(origin + tmp.length))
        })
    }, [commentsDocID, key])
    
    useEffect(() => {
        
        if (commentsDocID.length > 0 && key < commentsDocID.length) {    
            console.log("sef");
            handleScroll()
        }
        
    }, [commentsDocID])

return (
<div className="absolute w-full h-full z-20 flex flex-col items-center backdrop-filter backdrop-blur overflow-y-scroll">
        {commentUser &&
            <div className="flex w-full items-center justify-center my-2 mt-4">
                <input
                    value={text}
                    onKeyPress={handleKeypress}
                    onChange={(e: any) => {
                        setText(e.target.value)
                    }}
                    type="text"
                    placeholder="Type a message here ..."
                    className="py-2 px-3 rounded-xl text-sm w-2/3 border bg-gray-100" />
                <div
                    ref={enterRef}
                    onClick={() => {
                        if (text !== "") {
                            axios.post("http://localhost:3001/addcomment", {
                                text,
                                userUID: user.uid,
                                postDocID,
                                userProfileImg: commentUser.profileImg,
                                username: commentUser.username
                            }).then((res) => {
                                setComments((origin: any) => {
                                    return [res.data, ...origin]
                                })
                            })
                            setText("")
                        }
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-chatWhite cursor-pointer">
                    <svg x="0px" y="0px"
                        className="w-6"
                        fill="gray"
                        viewBox="0 0 60.083 60.083" >
                        <path d="M60.049,10.871c0-0.002-0.001-0.005-0.001-0.007c-0.023-0.125-0.066-0.239-0.132-0.343
                c-0.001-0.001-0.001-0.003-0.001-0.004c-0.001-0.002-0.003-0.003-0.004-0.005c-0.063-0.098-0.139-0.182-0.232-0.253
                c-0.019-0.015-0.039-0.026-0.059-0.04c-0.075-0.049-0.152-0.09-0.239-0.117c-0.055-0.019-0.111-0.025-0.168-0.034
                c-0.044-0.006-0.083-0.026-0.129-0.026H59.08c-0.039-0.001-0.066,0.003-0.094,0.006c-0.009,0.001-0.017,0-0.026,0.001
                c-0.009,0.001-0.019,0-0.029,0.002c-0.027,0.004-0.054,0.008-0.08,0.014L0.798,22.062c-0.413,0.086-0.729,0.421-0.788,0.839
                s0.15,0.828,0.523,1.025l16.632,8.773l2.917,16.187c-0.002,0.012,0.001,0.025,0,0.037c-0.01,0.08-0.011,0.158-0.001,0.237
                c0.005,0.04,0.01,0.078,0.02,0.117c0.023,0.095,0.06,0.184,0.11,0.268c0.01,0.016,0.01,0.035,0.021,0.051
                c0.003,0.005,0.008,0.009,0.012,0.013c0.013,0.019,0.031,0.034,0.046,0.053c0.047,0.058,0.096,0.111,0.152,0.156
                c0.009,0.007,0.015,0.018,0.025,0.025c0.015,0.011,0.032,0.014,0.047,0.024c0.061,0.04,0.124,0.073,0.191,0.099
                c0.027,0.01,0.052,0.022,0.08,0.03c0.09,0.026,0.183,0.044,0.277,0.044c0.001,0,0.002,0,0.003,0h0c0,0,0,0,0,0
                c0.004,0,0.008-0.002,0.012-0.002c0.017,0.001,0.034,0.002,0.051,0.002c0.277,0,0.527-0.124,0.712-0.315l11.079-7.386l11.6,7.54
                c0.164,0.106,0.354,0.161,0.545,0.161c0.105,0,0.212-0.017,0.315-0.051c0.288-0.096,0.518-0.318,0.623-0.604l13.936-37.825
                c0.093-0.151,0.146-0.33,0.146-0.521C60.083,10.981,60.059,10.928,60.049,10.871z M48.464,17.594L24.471,35.236
                c-0.039,0.029-0.07,0.065-0.104,0.099c-0.013,0.012-0.026,0.022-0.037,0.035c-0.021,0.023-0.04,0.046-0.059,0.071
                c-0.018,0.024-0.032,0.049-0.048,0.074c-0.037,0.06-0.068,0.122-0.092,0.188c-0.005,0.013-0.013,0.023-0.017,0.036
                c-0.001,0.004-0.005,0.006-0.006,0.01l-2.75,8.937l-2.179-12.091L48.464,17.594z M22.908,46.61l2.726-9.004l4.244,2.759l1.214,0.789
                l-4.124,2.749L22.908,46.61z"/>
                    </svg>
                </div>
            </div>}
    <div className="flex flex-col items-center gap-3 mt-3 w-full">
        {comments !== [] ? 
            comments.map((comment)=> <CommentRow commentInfo={comment}/>)    
            :
            <span>No Comments.</span>
        }
        {key < commentsDocID.length &&
            (
            <div
                onClick={() => {
                    handleScroll()
                }}
                className="cursor-pointer bottom-0 absolute w-1/2 bg-white h-10 flex items-center justify-center rounded-xl text-gray-500">
            Load more...
            </div>
        )
        }
    </div>
</div>
)
}

export default Comment