import { Box, Typography } from '@mui/material';

export default function GasAndPrice() {
  return (
    <Box>
      <Typography variant="h2">Gas là gì?</Typography>
      <Typography>
        Gas là đơn vị để đo lượng tính toán cần thiết để thực hiện một quá trình nào đó trên mạng ethereum. Vì mỗi giao
        dịch đều cần tài nguyên tính toán để thực hiện nên mỗi giao dịch đều cần phí. Gas chính là phí để thực hiện giao
        dịch, bất kể giao dịch đó thành công hay thất bại.
      </Typography>
      <Typography>
        Gas được trả bằng đồng native(native currency), gas có đơn vị là gwei, một gwei = 0.000000001 ETH. Ví dụ, thay
        vì nói phí gas là 0.000000001 ether, ta có thể nói giao dịch tốn 1 gwei.
      </Typography>
      <Typography variant="h2">Base fee</Typography>
      <Typography>
        Mỗi block có một khoản phí đóng vai trò giá khởi điểm. Base fee được tính toán độc lập với khối hiện tại, thay
        vào đó, nó tính toán dựa trên khối trước đó, điều này giúp người dùng dễ đoán được phí hơn. Khi block được khai
        thác, base fee sẽ được đốt, loại khỏi vòng tuần hoàn
      </Typography>
      <Typography>
        Base fee được tính toán dựa trên công thức so sánh giữa kích thước của block trước đó và kích thước tiêu chuẩn.
        Base fee sẽ tăng nhiều nhất 12.5% mỗi block nếu kích thước block tiêu chuẩn bị vượt.
      </Typography>
    </Box>
  );
}
