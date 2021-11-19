import React from 'react';
import '../../../Styles/Comments.css'


export default function ShowComment({ comentarios, puntuacion, usuario}) {

    return (
        <div className="commentsCont">
            {/* <div className="img-card-userName" > */}
            <div className='commentsCont'>
                <h5 className="comment-card-userName">{usuario}</h5>
                <p className="conte">{comentarios}</p>
                                <strong className='puntacionStyle'>Puntuación: <label className={parseInt(puntuacion) >= 1 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion)>= 2 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion) >= 4 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion) >= 3 ? 'estrellitaActiva' : 'EstrellitasGrises'}  >★</label>
                                    <label className={parseInt(puntuacion) === 5 ? 'estrellitaActiva' : 'EstrellitasGrises'} >★</label>
                                </strong>
                {/* </div> */}
            </div>
        </div>
    )
}