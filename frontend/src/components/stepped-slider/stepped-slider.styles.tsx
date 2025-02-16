export const styles: { [key: string]: React.CSSProperties} = {
    baseStyle: {
        color: "#ff4444",
        height: "6px"
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
        width: 8, // Adjust the mark size
        height: 8,
        borderRadius: "50%",
        backgroundColor: "#ff4444", // Red color for marks
    },
    labelStyle: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 24
    }
}