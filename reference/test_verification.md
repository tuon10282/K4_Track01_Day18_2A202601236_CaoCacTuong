# Test Guide — Day 18 Human–AI Micro-Prototypes

- Workbook: `http://127.0.0.1:4173/index.html`
- Tester prototype: `http://127.0.0.1:4173/prototype.html`
- Facilitator annotation: `http://127.0.0.1:4173/prototype.html?facilitator=1`

## 0. Workbook Chặng 1–6 checklist

- [ ] Header có `Tập trung`, `Ghi chú`, `Hỗ trợ`, `Tiếng Việt` và profile.
- [ ] Sidebar/mobile selector chuyển đúng Chặng 1–6; `Quay lại`/`Tiếp` cập nhật đúng.
- [ ] Chặng 1 tách observation khỏi interpretation và có Still Unproven.
- [ ] Chặng 2 giữ invariant, có bảng A/B/C và Distance check.
- [ ] Chặng 3 có đủ bốn quyết định và Human–AI Decision Table.
- [ ] Chặng 4 mở được tester/facilitator route và nhúng đúng prototype.
- [ ] Chặng 5 dùng cùng outcome task và đủ sáu facilitation rules.
- [ ] Chặng 6 có ba Feedback Notes, synthesis table và không điền sẵn dữ liệu giả.
- [ ] Ghi chú và form feedback còn dữ liệu sau khi refresh.
- [ ] GATE 5 chỉ chuyển sang đạt khi đủ ba note và synthesis bắt buộc.

## 1. Functional smoke checklist

### Common context

- [ ] Tester mode không hiển thị prototype annotation.
- [ ] A/B/C giữ nguyên context, task, slide, công thức và refresher fixture.
- [ ] Chuyển option luôn đưa nội dung học về Slide 04.
- [ ] Reset option chỉ xóa trạng thái option hiện tại.
- [ ] `Đặt lại` xóa trạng thái cả A/B/C và về Option A.

### Option A — AI hỏi trước

- [ ] Capability/limit xuất hiện trước khi AI hỏi.
- [ ] Không thể xem chẩn đoán nếu chưa chọn câu trả lời.
- [ ] Result trích chính lựa chọn của user làm evidence.
- [ ] `Chọn lại câu trả lời`, `Bỏ qua` và preview bài ôn hoạt động.

### Option B — AI chủ động

- [ ] Gợi ý dùng ngôn ngữ xác suất và hiển thị `68% chắc chắn`.
- [ ] Card liệt kê 52 giây dừng và ba lần quay lại làm evidence.
- [ ] Toggle tắt quan sát dẫn đến trạng thái không có gợi ý AI.
- [ ] `Không đúng` cho phép chọn concept khác và result cập nhật.
- [ ] `Ẩn gợi ý` và `Khôi phục gợi ý` hoạt động.

### Option C — Bạn dẫn dắt

- [ ] User chọn một trong bốn phần công thức.
- [ ] AI chỉ hiện câu làm rõ sau khi user đã chọn phạm vi.
- [ ] Không thể đối chiếu nếu chưa trả lời câu làm rõ.
- [ ] Result trích cả phạm vi và câu trả lời của user.
- [ ] `Sửa phần đã chọn` quay lại interaction mà không rời slide.

### Result và recovery

- [ ] Modal refresher dùng cùng fixture cho A/B/C.
- [ ] `Quay lại quyết định`, nút đóng và phím `Escape` đóng modal.
- [ ] `Đã hiểu · Quay lại slide` đánh dấu option hoàn thành.
- [ ] Trạng thái hoàn thành vẫn còn khi chuyển option rồi quay lại.
- [ ] Mobile 390px không có tràn ngang.

## 2. Facilitation script

**Opening**

> Chúng mình đang thử ba cách thiết kế, không kiểm tra bạn. Không có câu trả lời đúng hoặc sai. Bạn hãy tự thao tác và nói to điều mình đang nghĩ; mình sẽ cố gắng không hướng dẫn.

**Relevant context**

> Gần đây bạn có từng đọc lại một công thức nhiều lần mà vẫn chưa biết mình đang thiếu kiến thức nền nào không?

**Outcome task — dùng nguyên văn cho A/B/C**

> Trong tình huống này, hãy dùng từng phương án để tìm đúng kiến thức cần ôn và quyết định bước tiếp theo.

**Câu cứu hộ**

- “Bạn cứ nói to suy nghĩ của mình nhé.”
- “Bạn sẽ làm gì tiếp theo?”
- “Theo bạn, nó nên hoạt động như thế nào?”

**Compare**

- “Trong tình huống này, bạn chọn A, B hay C? Vì sao?”
- “Bạn muốn tự làm phần nào và giao cho AI phần nào?”
- “Điều gì ở phương án đã chọn khiến bạn chưa thoải mái?”

## 3. Prototype Feedback Notes

Sao chép block này thành ba bản độc lập. Không gộp ghi chép giữa các tester.

### Feedback Note ___

**Tester/context:** ........................................................................................................

| Observation | Note |
|---|---|
| First action | |
| Chỗ dừng, do dự hoặc hiểu sai | |
| Evidence được đọc hay bỏ qua | |
| Cách tester sửa hoặc lấy lại control | |
| Option được chọn | A / B / C |
| Lý do và trade-off | |
| Evidence chống lại kỳ vọng nhóm | |

**OBSERVED — Tester đã làm hoặc nói gì?**

> ....................................................................................................................................

**INTERPRETED — Nhóm nghĩ điều đó có thể có nghĩa gì?**

> ....................................................................................................................................

**DECIDED — NEXT CHANGE**

> ....................................................................................................................................

**STILL UNPROVEN**

> ....................................................................................................................................

## 4. Group Feedback Synthesis

| Nội dung | Feedback 1 | Feedback 2 | Feedback 3 | Pattern hoặc khác biệt |
|---|---|---|---|---|
| First action | | | | |
| Breakdown chính | | | | |
| Cách lấy lại control | | | | |
| Option được chọn | | | | |
| Trade-off | | | | |

**Một Next Change nhóm chốt:** .........................................................................................

**Evidence dẫn tới quyết định:** ........................................................................................

**Still Unproven sau ba feedback:** ...................................................................................
