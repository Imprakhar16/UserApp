export const Loader = ({className,size})=>{
    return (
        <div className={className} >
        <div className="spinner-border"  style={{width:size , height:size}} role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    )
}