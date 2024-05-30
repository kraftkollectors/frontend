type AppToastProps = {
    message:string
}

const AppToast = {
    error({message}:AppToastProps){
        return <div className="text-red-800 font-semibold">{message}</div>
    },
    success({message}:AppToastProps){
        return <div className="text-green-800 font-semibold">{message}</div>
    },
    primary({message}:AppToastProps){
        return <div className="text-primary font-semibold">{message}</div>
    },
    info({message}:AppToastProps){
        return <div className="text-black-800 font-semibold">{message}</div>
    },
}

export default AppToast