const ErrorMessagePopup = ({ message, onClose, open = false }) => {
    if (!open) return null;
    
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <p>{message}</p>
                <button onClick={onClose} style={styles.button}>Fermer</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(25,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    popup: {
        background: '#fff',
        padding: '24px',
        borderRadius: '8px',
        minWidth: '300px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        textAlign: 'center',
    },
    button: {
        marginTop: '16px',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        background: '#D22F19FF',
        color: '#fff',
        cursor: 'pointer',
    }
};

export default ErrorMessagePopup;