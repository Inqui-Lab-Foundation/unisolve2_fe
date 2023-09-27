/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import LinkComponent from './pages/LinkComponent';
import IdeaPage1 from '../../../assets/media/idea report/idea_page1.jpg';
import IdeaPage2 from '../../../assets/media/idea report/idea_page2.jpg';
import IdeaPage3 from '../../../assets/media/idea report/idea_page3.jpg';
import moment from 'moment';
// const detailToDownload = (props) => {
class detailToDownload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
      
        return (
            <div className="container-fluid bg-white">
                <div className="row">
                    <div style={{ position: 'relative', padding: '0' }}>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '36rem',
                                left: '25rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.organization_code}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '38.5rem',
                                left: '26rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.organization_name}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '41.4rem',
                                left: '21rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.district}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '44.2rem',
                                left: '23rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.category}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '55rem',
                                left: '28rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.mentor_name}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '58rem',
                                left: '28rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.mobile}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '60.7rem',
                                left: '25rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.team_name}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '63.7rem',
                                left: '18rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins'
                            }}
                        >
                            {this.props?.ideaDetails?.challenge_response_id}
                        </span>
                        <span
                            style={{
                                position: 'absolute',
                                top: '67rem',
                                left: '12.9rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold'
                            }}
                        >
                           {'Idea Title :'}
                        </span>
                        <span
                            style={{
                                position: 'absolute',
                                top: '67rem',
                                left: '25rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins',
                                overflowWrap: 'anywhere',
                                width: '65%'
                            }}
                        >
                            {this.props?.teamResponse && this.props?.teamResponse[7] ? this.props?.teamResponse[7].selected_option[0]:'-' }
                        </span>
                        <span
                            style={{
                                position: 'absolute',
                                top: '79rem',
                                left: '12.9rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold'
                            }}
                        >
                           {'Student Name :  '}
                        </span>
                        <span
                            style={{
                                position: 'absolute',
                                top: '79rem',
                                left: '28rem',
                                fontSize: '1.8rem',
                                fontFamily: 'Poppins',
                                overflowWrap: 'anywhere',
                                width: '60%'
                            }}
                        >
                            {this.props?.ideaDetails?.team_members &&
                                this.props?.ideaDetails?.team_members.toString()}
                        </span>
                        
                        <img
                            src={IdeaPage1}
                            alt="IdeaPage1"
                            style={{
                                height: '112rem',
                                width: '100%'
                            }}
                        />
                    </div>
                    <div style={{ position: 'relative', padding: '0' }}>
                        <img
                            src={IdeaPage2}
                            alt="IdeaPage2"
                            style={{
                                width: '100%'
                            }}
                        />
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '12rem',
                                left: '10rem',
                                fontSize: '1.5rem',
                                fontFamily: 'poppins'
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    padding: '0.5rem',
                                    backgroundColor: '#FFBB3F',
                                    borderRadius: '5px'
                                }}
                            >
                                Submitted by :
                            </span>{' '}
                            {this.props?.ideaDetails?.initiated_name}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '12rem',
                                left: '50rem',
                                fontSize: '1.5rem',
                                fontFamily: 'poppins'
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    padding: '0.5rem',
                                    backgroundColor: '#FFBB3F',
                                    borderRadius: '5px'
                                }}
                            >
                                Submitted on :
                            </span>{' '}
                            {moment(this.props?.ideaDetails?.submitted_at).format(
                                'DD-MM-YYYY'
                            )}
                        </span>
                    </div>

                    {/* ----------------------------------------- */}
                    {/* -------------questions answers---- */}
                    <div className="col-12">
                        <div style={{ borderStyle: 'solid', margin: '0 2rem' }}>
                            {this.props?.teamResponse &&
                                this.props?.teamResponse.length > 0 &&
                                this.props?.teamResponse.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="mb-4 my-3  px-5 py-3 me-md-3"
                                        >
                                            <div className="question quiz mb-0">
                                                <b
                                                    style={{
                                                        fontSize: '1.6rem',
                                                        fontFamily: 'courier'
                                                    }}
                                                >
                                                    {item?.question_no || ''}.{' '}
                                                    {item?.question || ''}
                                                </b>
                                            </div>
                                            <div className="bg-light rounded p-5">
                                                <p
                                                    style={{
                                                        fontSize: '1.4rem',
                                                        fontFamily: 'courier'
                                                    }}
                                                >
                                                    {item?.question_type ===
                                                    'MCQ' ? (
                                                        item?.selected_option?.map(
                                                            (data, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {data ||
                                                                            ''}
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : item?.question_type ===
                                                          'TEXT' ||
                                                      item?.question_type ===
                                                          'MRQ' ? (
                                                        item?.selected_option
                                                    ) : item?.question_type ===
                                                      'DRAW' ? (
                                                        <LinkComponent
                                                            item={
                                                                item.selected_option
                                                            }
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    {/* ----------------------------------- */}
                    <img
                        src={IdeaPage3}
                        alt="IdeaPage3"
                        style={{
                            width: '100%',
                            padding: '0'
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default detailToDownload;
