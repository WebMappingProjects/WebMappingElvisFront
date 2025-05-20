const ConfirmMessagePopup = ({
    message = "Êtes-vous sûr de vouloir continuer ?",
    onConfirm,
    onCancel,
    open = false,
}) => {
    if (!open) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <p>{message}</p>
                <div style={styles.buttons}>
                    <button onClick={onConfirm} style={styles.confirm}>Confirmer</button>
                    <button onClick={onCancel} style={styles.cancel}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.4)',
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
    buttons: {
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    confirm: {
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cancel: {
        background: '#e0e0e0',
        color: '#333',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ConfirmMessagePopup;