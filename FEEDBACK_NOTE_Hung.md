# Prototype Feedback Note — Kim Mạnh Hưng

**Tester/context:** Kim Mạnh Hưng — 2A202601679 · Tự học slide online · Thích học nhanh, muốn AI tự động hỗ trợ

---

## Observation

| Observation | Note |
|---|---|
| First action | Mở Option B trước, thấy observer chip "Đang đọc" |
| Chỗ dừng, do dự hoặc hiểu sai | Hơi do dự khi thấy progress "60%" — "AI đang theo dõi à?" nhưng sau đó thấy hint tier 2 thì hiểu |
| Evidence được đọc hay bỏ qua | Đọc refresher ở Option B nhưng thấy ví dụ hơi chung chung, muốn ví dụ cụ thể hơn |
| Cách tester sửa hoặc lấy lại control | Hint xuất hiện → bấm "Ôn lại" → đọc refresher → bấm "Xong" → tiếp tục đọc |
| **Option được chọn** | **B** |
| Lý do và trade-off | Thích B vì **tự động** — không cần tự bấm checkpoint, AI tự gợi ý đúng lúc. Tiện hơn A phải tự kích hoạt. Nhưng **ví dụ trong refresher cần cụ thể hơn** với số liệu thực tế. |
| Evidence chống lại kỳ vọng của nhóm | Tester nói "B tiện nhất, nhưng ví dụ nên có số liệu kiểu 'shop X doanh thu $50K, lỗ $10K' để dễ hình dung" |

---

## Bốn lớp phân tích

### OBSERVED
- Tester mở Option B đầu tiên, dành nhiều thời gian nhất ở đây.
- Ở Option B: đọc slide trang 1 → thấy observer chip "Đang đọc 15%" → tiếp tục đọc → chip cập nhật "60%".
- Hint tier 2 xuất hiện: "Có vẻ bạn đang dừng lại ở phần valuation — concept này liên quan tới 3 phương pháp định giá".
- Tester dừng lại, đọc hint, bấm "Ôn lại" → refresher về "Ba phương pháp định giá start-up" xuất hiện.
- Đọc refresher nhưng nói "ví dụ hơi chung chung, muốn thấy số liệu cụ thể".
- Bấm "Xong" → tiếp tục đọc slide.
- Sau đó thử Option A và C, nhưng quay lại B và nói "cái này tiện nhất, không cần bấm gì cả".

### INTERPRETED
- **Proactive (B) phù hợp với learner muốn học nhanh** — không cần tự kích hoạt checkpoint, AI tự động gợi ý đúng lúc.
- **Observer chip không gây khó chịu** — tester chấp nhận được việc hiển thị progress, miễn là có giá trị (hint xuất hiện đúng lúc).
- **Refresher cần ví dụ cụ thể hơn** — thay vì "một shop online mới", cần số liệu thực tế như "Shop ABC doanh thu $50K/tháng, lỗ $10K, định giá $500K".
- **Option B > A về convenience** — tester thích tự động hơn phải tự bấm checkpoint.
- **Option A vẫn có giá trị cho privacy-conscious learner** — nhưng không phải preference của tester này.

### DECIDED — NEXT CHANGE
- [x] **Giữ Option B làm primary:** B là cơ chế chính, phát triển thêm.
- [x] **Enhance B với ví dụ cụ thể:** Thay ví dụ chung chung bằng case study với số liệu thực tế.
- [ ] **Option A:** Giữ như fallback cho privacy-conscious learner.
- [ ] **Option C:** Bỏ clarify step, thêm câu trả lời tức thì sau khi chọn concept.
- [ ] **Test tiếp:** Verify pattern B với ví dụ cụ thể có giúp learner hiểu nhanh hơn không.

### STILL UNPROVEN
- Liệu ví dụ cụ thể với số liệu có thực sự giúp learner hiểu nhanh hơn không?
- Observer chip có gây lo ngại privacy với learner nhạy cảm không?
- Hint tier 2 có xuất hiện đúng timing không, hay quá sớm/muộn?

---

## Chi tiết tương tác với Option B

### Quan sát hành vi đọc
**Observer chip:** "Đang đọc 15%" → sau 30 giây → "Đang đọc 60%"

**Phản hồi của tester:**
> "Lúc đầu thấy chip này hơi lạ, nhưng sau đó thấy hint xuất hiện thì hiểu — AI đang theo dõi để biết khi nào gợi ý. Ổn, miễn là có ích."

### Hint tier 2 xuất hiện
**Nội dung hint:** "Có vẻ bạn đang dừng lại ở phần valuation — concept này liên quan tới 3 phương pháp định giá"

**Phản hồi của tester:**
> "Đúng là tôi đang đọc phần valuation và chưa rõ lắm. Hint này đúng timing. Tôi bấm 'Ôn lại' luôn."

### Refresher xuất hiện
**Concept:** "Ba phương pháp định giá start-up"

**Nội dung refresher:**
- **Cost-to-duplicate:** Tính tổng chi phí tái tạo sản phẩm và team
- **Market multiple:** So sánh với công ty tương đương đã exit
- **Discounted cash flow:** Dự báo dòng tiền tương lai rồi chiết khấu về hiện tại

**Ví dụ hiện tại (chung chung):** "Một shop online mới khó dùng DCF vì chưa có data đủ dài."

**Phản hồi của tester:**
> "Refresher này giải thích 3 phương pháp, nhưng ví dụ hơi mơ hồ. Nếu có số liệu cụ thể kiểu 'Shop ABC doanh thu $50K/tháng, lỗ $10K, định giá $500K bằng market multiple' thì tôi sẽ hình dung được rõ hơn. Chung chung quá thì khó apply."

**Đề xuất cải thiện Option B:**
- **Ví dụ cụ thể hơn với số liệu:** 
  - Thay vì: "Một shop online mới"
  - Thành: "Shop thời trang XYZ hoạt động 8 tháng, doanh thu $50K/tháng, lỗ $10K/tháng, định giá $500K (10x doanh thu tháng) dựa trên market multiple của các start-up e-commerce giai đoạn seed tương tự"

**Action:** Bấm "Xong" → tiếp tục đọc slide

---

## So sánh với Option A và C

### Option A — Reactive checkpoint
**Tester cũng thử Option A để so sánh:**

**Tương tác với Option A:**
- Đọc slide trang 1 → bấm "Pause & Checkpoint"
- Thấy câu hỏi: "Ở đoạn vừa đọc, điều nào gần nhất với chỗ bạn chưa rõ?"
- Đọc 3 lựa chọn A, B, C:
  - **A:** "Vì sao start-up chưa có lợi nhuận vẫn được định giá?"
  - **B:** "Con số định giá được tính bằng cách nào?"
  - **C:** "Pre-money, post-money và tỷ lệ cổ phần liên hệ ra sao?"
- Chọn **B** → bấm "Xem gợi ý phù hợp"

**Phản hồi của tester:**
> "A thì rõ ràng hơn B — tôi biết AI chỉ dùng câu trả lời của tôi, không theo dõi hành vi đọc. Dòng chữ 'AI chỉ nhận lựa chọn sau khi bạn bấm Xem gợi ý phù hợp' cũng an tâm. Nhưng mà **phải tự bấm checkpoint thì hơi mất flow**. Với B thì tự nhiên hơn, AI tự gợi ý đúng lúc. Nếu tôi đang đọc mà không nhớ bấm checkpoint thì sao?"

**Ý kiến khác (không thuộc 3 lựa chọn A):**
> "Tôi cũng thắc mắc về việc **ai quyết định con số định giá** — founder tự đặt hay nhà đầu tư đưa ra? Có công thức chung không hay mỗi deal một giá? Mấy câu hỏi A, B, C không cover hết câu hỏi trong đầu tôi."

**Đề xuất cải thiện Option A:**
- Thêm option "Ý kiến khác" để learner có thể viết câu hỏi riêng nếu 3 lựa chọn không phù hợp
- Giữ transparency feature (evidence trail, privacy messaging) vì đây là strength của A

### Option C — Collaborative inquiry
**Phản hồi của tester:**
> "C có FAB để mở concept library thì tiện, nhưng sau khi chọn concept, AI hỏi lại 'Bạn muốn clarify gì về concept này?' — **hơi thừa**. Tôi đã chọn concept rồi, nghĩa là tôi muốn học concept đó ngay, không muốn bước clarify nữa. Nếu có **câu trả lời ngay sau khi chọn**, kiểu 'Bạn chọn concept X vì [lý do], bài ôn sẽ giúp bạn [mục tiêu]' thì sẽ mượt hơn. Giống như A có evidence trail ấy, nhưng ở C thì ngắn gọn hơn."

**Đề xuất cải thiện Option C:**
- **Bỏ bước "clarify question"** nếu learner đã chọn concept rõ ràng
- **Thêm câu trả lời tức thì** sau khi chọn concept:
  - "Bạn chọn concept **Ba phương pháp định giá** vì slide đang nói về valuation. Bài ôn sẽ giúp bạn phân biệt cost-to-duplicate, market multiple và DCF."
- Giữ summary feature (tóm tắt concept) vì tester thấy hữu ích khi quyết định chọn concept nào

---

## Next Change options

- [x] Giữ một option và sửa interaction (chọn B, thêm ví dụ cụ thể)
- [ ] Kết hợp hai options nhưng giữ một cơ chế chính rõ ràng (B + transparency từ A)
- [ ] Bỏ một option vì tester không hiểu hoặc nó không tạo khác biệt
- [x] Sửa cả ba rồi test người tiếp theo (B: ví dụ cụ thể, A: thêm "ý kiến khác", C: bỏ clarify step)

---

## Action items

1. **Option B (primary):** Thay ví dụ chung chung bằng case study với số liệu cụ thể
   - Ví dụ: "Shop thời trang XYZ hoạt động 8 tháng, doanh thu $50K/tháng, lỗ $10K/tháng, định giá $500K (10x doanh thu tháng) dựa trên market multiple"
2. **Option A:** Thêm option "Ý kiến khác" để learner tự viết câu hỏi nếu 3 lựa chọn không đủ
3. **Option C:** Bỏ clarify step, thêm câu trả lời tức thì sau khi chọn concept
4. **General:** Test lại với learner tiếp theo để verify improvements
