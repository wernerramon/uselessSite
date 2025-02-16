export const styles: { [key: string]: React.CSSProperties} = {
    baseStyle: {
        color: "#ff4444",
        height: "6px",
    },
    boxStyle: {
        width: "80%",
        maxWidth: 400,
        minWidth: 150,
        padding: 5
    },
    thumbStyle: {
        width: 30,
        height: 30,
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: "50%",
        fontSize: "30px",
    },
    markStyle: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "#ff4444",
    },
    labelStyle: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "calc(6px + 2vmin)"
    }
}