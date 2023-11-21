// Heigher order component -> Thay đổi màu chữ ngẫu nhiên
export const color = (ParentComponent) => {
    // Tạo ra một component mới
    const Component = (props) => {
        const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        return (
            <div style={{ color }}>
                <ParentComponent {...props} />
            </div>
        )
    }
    return Component;
}

// Gọi: color(App)
// Tạo ra một hàm mới, nhận vào một component -> Trả về 1 hàm con. Trong hàm con đó trả về component ban đầu
// Ôn lại kiến thứ closure