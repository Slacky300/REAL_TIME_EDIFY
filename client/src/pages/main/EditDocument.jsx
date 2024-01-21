import React from 'react'

const EditDocument = () => {
    return (
        <div className='container my-4'>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-2'>
                    <ul className="list-group">
                        <li className="list-group-item active" aria-current="true">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
                <div className='col-md-10'>
                    <form>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Title</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={"Roi"} />

                        </div>

                        <div className="mb-3">

                            <label for="exampleFormControlTextarea1" className="form-label">Content</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                        </div>

                        <div className="mb-3">

                            <button type="button" className="btn btn-primary">Save</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditDocument