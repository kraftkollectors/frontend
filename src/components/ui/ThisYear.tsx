export default function ThisYear() {
    const date = new Date();
    const year = date.getFullYear();
    
    return (
        <>{year}</>
    );
}