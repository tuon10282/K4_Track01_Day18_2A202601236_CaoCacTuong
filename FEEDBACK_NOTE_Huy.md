# Prototype Feedback Note — Nguyễn Quang Huy

**Tester/context:** Nguyễn Quang Huy — 2A202601873 · Tự học slide online · Đã từng đọc lại công thức nhiều lần mà không hiểu

---

## Observation

| Observation | Note |
|---|---|
| First action | Bấm FAB ở Option C ngay khi thấy icon, sau đó thử observer chip ở Option B |
| Chỗ dừng, do dự hoặc hiểu sai | Không do dự; thao tác顺畅, nhưng dừng lại đọc kỹ khi hint tier 1 hiện ở Option B |
| Evidence được đọc hay bỏ qua | Đọc hết evidence "bạn ở trang này Xs" ở Option B; bỏ qua clarify question ở Option C vì đã biết đáp án |
| Cách tester sửa hoặc lấy lại control | Bấm "Không đúng" ở Option B để xem concept khác; bấm "Chọn khái niệm khác" ở Option C |
| **Option được chọn** | **B** |
| Lý do và trade-off | Thích B vì **chủ động** — không cần bấm gì, AI tự hiện gợi ý. C phải tự bấm FAB rồi chọn, mất thêm bước. Nhưng muốn có feature tóm tắt của C trong B. |
| Evidence chống lại kỳ vọng của nhóm | Không có — B đúng như thiết kế, proactive function hoạt động đúng |

---

## Bốn lớp phân tích

### OBSERVED
- Tester thao tác với cả 3 option, không cần hướng dẫn.
- Option B: ngay khi observer chip hiện "Đang đọc 40%", tester nhìn xuống và chờ. Khi hint tier 1 pill hiện, tester bấm expand ngay.
- Option C: bấm FAB, chọn concept, nhưng dừng ở clarify question — nói "cái này mình đã biết rồi, cho mình qua luôn".
- Cả 3 option: tester đều tìm được nút Reset và quay lại slide thành công.

### INTERPRETED
- **Proactive (B) tạo cảm giác được hỗ trợ** mà không bị gián đoạn — tester không phải "hỏi" mà AI tự đến.
- **Clarify step ở C bị thừa** nếu learner đã rõ mình thiếu gì; câu hỏi làm rõ có thể skip được.
- **Feature tóm tắt** (summary banner) hữu ích cho việc review nhanh trước khi bắt đầu — tester muốn thấy nó ở cả B.
- Evidence confidence % ở B tạo trust — tester đọc evidence để kiểm tra logic của AI.

### DECIDED — NEXT CHANGE
- [ ] **Enhance Option B:** thêm summary banner khi bấm nút "Tóm tắt" ở header (như C hiện tại).
- [ ] **Enhance Option C:** cho phép skip clarify step — thêm nút "Mình đã rõ, mở bài ôn luôn" ở clarify view.
- [ ] **Content improvement:** làm rõ hơn câu hỏi clarify, thêm chi tiết hơn trong refresher bullets.
- [ ] **Tier 1 → expand:** kiểm tra xem pill có quá nhỏ không, có nên auto-expand sau 3s không.

### STILL UNPROVEN
- Liệu feature tóm tắt ở B có thực sự cần thiết không, hay tester chỉ thích vì thấy ở C?
- Clarify step có cần thiết cho learner mới, hay nên bỏ hoàn toàn?
- Confidence % có thực sự tạo trust, hay chỉ là decoration?

---

## Next Change options

- [x] Giữ một option và sửa interaction
- [ ] Kết hợp hai options nhưng giữ một cơ chế chính rõ ràng
- [ ] Bỏ một option vì tester không hiểu hoặc nó không tạo khác biệt
- [ ] Sửa cả ba rồi test người tiếp theo
