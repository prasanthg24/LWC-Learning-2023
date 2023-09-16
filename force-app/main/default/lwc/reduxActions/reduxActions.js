import getContactList from '@salesforce/apex/contactRecords.fetchCon';
export const INITIALIZE_CONTACT_LIST = 'INITIALIZE_CONTACT_LIST';
export const ERROR = 'ERROR';

export const initialize = () => {
    console.log("im in reduxActions--");

    return (dispatch, getState) => {
        
        getContactList()
            .then((result) => {
                console.log("result---", result);
                dispatch({
                    type: INITIALIZE_CONTACT_LIST,
                    payload: result
                });
                 const reduxStateUpdated = new CustomEvent('reduxStateUpdated');
                document.dispatchEvent(reduxStateUpdated);
               
            })
            .catch((error) => {
                
                
            });
    };
};