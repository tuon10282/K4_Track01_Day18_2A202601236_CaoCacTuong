# Prototype Feedback Note — Lăng Thị Phương Huế

**Tester/context:** Lăng Thị Phương Huế — 2A202601915 · Tự học slide online · Thỉnh thoảng đọc lại slide nhưng chưa gặp difficulty lớn

---

## Observation

| Observation | Note |
|---|---|
| First action | Mở Option B trước, nhìn observer chip, sau đó qua Option C bấm FAB |
| Chỗ dừng, do dự hoặc hiểu sai | Hơi do dự ở Option A khi thấy checkpoint — "cái này giống quiz quá" |
| Evidence được đọc hay bỏ qua | Đọc evidence ở Option B; đọc tóm tắt summary ở Option C kỹ |
| Cách tester sửa hoặc lấy lại control | Ở Option B: bấm "Ôn lại" rồi "Xong". Ở Option C: chọn concept → confirm → refresher |
| **Option được chọn** | **B** |
| Lý do và trade-off | Thích B vì **tự nhiên** — đang học thì AI tự gợi ý, không phải "hỏi". Nhưng **willing** có thêm feature tóm tắt ở C để review nhanh. |
| Evidence chống lại kỳ vọng của nhóm | Tester nói "C cũng hay nhưng phải bấm nhiều bước hơn" |

---

## Bốn lớp phân tích

### OBSERVED
- Tester mở Option B đầu tiên, dành nhiều thời gian nhất ở đây.
- Ở Option B: observer chip "Đang đọc 60%" → tester dừng lại nhìn → hint tier 2 hiện → bấm "Ôn lại" → đọc refresher → bấm "Xong".
- Ở Option C: bấm FAB → chọn concept → clarify question → bấm "Xác nhận, mở bài ôn" → đọc refresher.
- Ở Option A: mở checkpoint, đọc 2 câu hỏi, nói "cái này giống kiểm tra quá" → đóng.
- Thao tác cả 3 option đều rõ ràng, không cần hướng dẫn.

### INTERPRETED
- **Proactive (B) phù hợp với learning flow** — đang đọc thì được gợi ý, không mất flow.
- **Option A tạo cảm giác "bị kiểm tra"** — checkpoint giống quiz hơn là hỗ trợ.
- **Option C có step thừa** — clarify question đôi khi không cần thiết nếu learner đã rõ.
- **Summary feature ở C hữu ích** — tester đọc kỹ tóm tắt trước khi chọn concept, cho thấy đây là touchpoint tốt.
- **Cả 2 user đều thích B** → pattern rõ: proactive > reactive, và collaborative cần tinh gọn hơn.

### DECIDED — NEXT CHANGE
- [ ] **Giữ Option B làm primary:** B là cơ chế chính, phát triển thêm.
- [ ] **Option C → refactor:** bỏ clarify step, thêm summary feature vào B.
- [ ] **Option A:** cân nhắc bỏ hoặc giữ như minimal fallback.
- [ ] **Enhance B:** thêm summary banner, cải thiện content refresher chi tiết hơn.
- [ ] **Test tiếp:** verify pattern B > C với user tiếp theo.

### STILL UNPROVEN
- Liệu proactive (B) có gây lo ngại privacy với learner nhạy cảm không?
- Summary feature có thực sự giúp learner quyết định nhanh hơn không?
- Option A có phù hợp với learner thích structured learning không?

---

## Next Change options

- [x] Giữ một option và sửa interaction
- [x] Kết hợp hai options nhưng giữ một cơ chế chính rõ ràng
- [ ] Bỏ một option vì tester không hiểu hoặc nó không tạo khác biệt
- [ ] Sửa cả ba rồi test người tiếp theo
