export const productDetail = ({ data }) => {
    // console.log(obj);
    const id = data.id;

    return `
    <h1>Chi tiết sản phẩm: ${id}</h1>
    <button>Button</button>
    `;
}