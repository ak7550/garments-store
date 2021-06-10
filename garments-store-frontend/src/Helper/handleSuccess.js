import SuccessComponent from "./SuccessComponent";

export const handleSuccess = data => {
    alert(data);
    return (
        <SuccessComponent success={data} />
    )
}
