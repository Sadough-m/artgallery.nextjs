
export default ()=>{
    return     typeof window !== "undefined"
            ? localStorage.getItem("collectionId") || 0
            : 0;
}
