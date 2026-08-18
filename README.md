# K4_Track01_Day18_2A202601236_CaoCacTuong

**Track 1 · Day 18 — Finding and Validating Pain Points**
**Case đã chọn:** Case A — AI Tutor: Diagnostic Refresher

---

## 1. Thông tin cá nhân & nhóm

| | |
|---|---|
| **Mã sinh viên (MHV)** | 2A202601236 |
| **Họ và tên** | Cao Các Tường |
| **Tên nhóm** | Hihi |
| **Thành viên** | Cao Các Tường (2A202601236) · Đinh Lê Quỳnh Phương (2A202601865) |
| **Case đã chọn** | Case A — AI Tutor: Diagnostic Refresher |

---

## 2. Problem Hypothesis Brief (kết quả Chặng 1)

> **Khi learner tự học, đang đọc một slide nhưng không hiểu một phần nào đó (đọc lại nhiều lần vẫn
> không nối được ý, không nắm được khái niệm đang được nói đến), họ không xác định được mình đang thiếu
> khái niệm nền nào, nên không biết phải tra cứu hay hỏi cái gì. Kết quả là họ mất 20–40 phút tra cứu
> lan man và hiểu lệch, hoặc bỏ qua và học tiếp trong trạng thái hổng — làm các bài phụ thuộc sau đó
> càng khó và tăng nguy cơ bỏ dở khoá học.**

---

## 3. Chặng 2 — Chọn ba Solution Options (GATE 2)

> Problem ở Chặng 1 thuần về **đọc slide không hiểu**; còn ở Chặng 2, ba solution khác nhau ở **cách AI
> tìm ra learner đang thiếu khái niệm nền nào** (hỏi / quan sát / đối thoại) — đây là công cụ của
> solution, không phải tình huống của problem.

### 3.1. Giữ nguyên cho cả A/B/C

| Thành phần | Quyết định chung |
|---|---|
| Target user | Learner sử dụng slide để tự học trong khoá online, đang học dở một bài cụ thể |
| Situation | Đọc slide không hiểu một phần nào đó (đọc lại nhiều lần vẫn không nối được ý) |
| Task | Xác định khái niệm nền đang thiếu và nhận refresher để tiếp tục |
| Desired outcome | Nhận diện đúng gap, bù kiến thức trong vài phút (thay vì 20–40'), tiếp tục bài không hổng |
| Content/data fixture | Slide bài giảng (text), concept graph các khái niệm nền + link refresher tương ứng |

### 3.2. Khác nhau giữa A/B/C

| Thành phần | Option A — **Reactive** | Option B — **Proactive** | Option C — **Collaborative** |
|---|---|---|---|
| **AI giống như...** | Thầy giáo **hỏi** để tìm ra learner chưa hiểu chỗ nào | Thầy giáo **quan sát** learner dán mắt vào một phần lâu, tự đoán rồi gợi ý | Learner **tự nói** "em không hiểu đoạn này" và thầy **đối thoại** lại để chốt đúng gap |
| **Solution mechanism** | AI gắn sẵn "checkpoint hiểu bài" (1 câu hỏi ngắn theo từng phần của slide); learner trả lời ngay trên slide. Sai/không chắc → AI mở chuỗi 2–3 câu chẩn đoán (adaptive branching) khoanh vùng khái niệm nền → refresher + 1 câu kiểm tra lại | AI âm thầm theo dõi hành vi đọc (thời gian ở một phần, đọc lại nhiều lần, cuộn lên xuống lặp lại), dựng "giả thuyết gap" mà không hỏi; chỉ hiện card nhẹ "Có vẻ bạn vướng X" kèm nút mở refresher 1 chạm | Learner chủ động bấm "Em mắc chỗ này" và mô tả bằng lời (hoặc dán đoạn khó hiểu); AI đối thoại Socratic: hỏi 1–2 câu làm rõ → ánh xạ vào concept graph → refresher → xin xác nhận |
| **User làm gì** | Đọc slide; trả lời checkpoint ngay trên slide; nếu sai, trả lời chuỗi câu hỏi chẩn đoán | Học như bình thường; khi card hiện, chạm mở hoặc bỏ qua | Khởi động, mô tả sự bối rối bằng lời tự nhiên, trả lời câu làm rõ, xác nhận chẩn đoán |
| **AI làm gì** | Chèn checkpoint, chấm, chọn câu hỏi tiếp theo, khoanh vùng gap, chọn refresher từ concept graph, kiểm tra lại | Mô hình hoá hiểu biết từ tín hiệu hành vi, xếp hạng khái niệm khả nghi, viết gợi ý + refresher, học từ việc bị bỏ qua | Parse mô tả, so khớp concept graph, hỏi làm rõ nếu mơ hồ, sinh refresher, điều chỉnh theo phản hồi |
| **Trigger** | Trả lời sai checkpoint trên slide (hoặc bấm "Mình không hiểu phần này") | Tín hiệu hành vi đọc: đọc lại quá N lần, dừng lâu ở một phần, cuộn lên xuống lặp lại | Learner khởi động (nút/chat) — hoặc gợi ý của B dẫn vào C |
| **Trade-off chính** | Chẩn đoán chuẩn, ngay trong luồng đọc; nhưng hơi gián đoạn vì bị hỏi, cảm giác bị "kiểm tra" khi đang đọc | Không gián đoạn, proactive; nhưng chỉ là xác suất — có thể sai/gây khó chịu; cold-start yếu | Chính xác + tôn trọng quyền learner nhất; nhưng đòi learner mô tả được vấn đề — đúng cái họ thiếu; friction cao với người nhút nhát |

---

## 4. Chặng 3 — Human–AI Design pass (GATE 3)

### 4.1. Human–AI Decision Table

| Human–AI decision | Option A — **Reactive** (checkpoint) | Option B — **Proactive** (quan sát) | Option C — **Collaborative** (đối thoại) |
|---|---|---|---|
| **User làm gì? AI làm gì?** | User: đọc slide, trả lời checkpoint + chuỗi câu chẩn đoán. AI: chèn checkpoint, chấm, chọn câu hỏi tiếp theo, khoanh vùng gap, sinh refresher, kiểm tra lại | User: học bình thường, chạm mở hoặc bỏ qua card gợi ý. AI: theo dõi hành vi đọc (dwell time, đọc lại, cuộn), dựng giả thuyết gap, viết gợi ý + refresher, học từ việc bị bỏ qua | User: bấm "Em mắc chỗ này", mô tả/dán đoạn khó hiểu, trả lời câu làm rõ, xác nhận. AI: parse, so khớp concept graph, hỏi làm rõ, sinh refresher, điều chỉnh theo xác nhận |
| **AI Act / Ask / Don't Act? Vì sao?** | **Ask trước khi Act** — AI hỏi checkpoint/chẩn đoán rồi mới đưa refresher. Vì: chẩn đoán sai khiến learner học lệch; chi phí 1–2 câu hỏi thấp hơn hậu quả đoán sai | **Act nhẹ (gợi ý), không thay đổi luồng** — vì chẩn đoán từ hành vi chỉ là xác suất; card gợi ý là low-stakes, quyền mở ở learner | **Ask trước, luôn xin xác nhận trước Act** — vì learner là người biết mình mắc ở đâu; quyền chốt gap thuộc learner, AI không tự áp đặt |
| **User hiểu capability/limit bằng gì?** | Intro đầu slide: "Slide có checkpoint; sai sẽ được hỏi thêm vài câu để tìm khái niệm nền thiếu". Giới hạn: chỉ phủ khái niệm có trong concept graph, không giải đáp mọi thắc mắc | First-run: "AI quan sát cách bạn đọc để gợi ý — chỉ là gợi ý, có thể tắt". Giới hạn: không theo dõi ngoài hành vi đọc, không ghi âm, tắt được hoàn toàn | Intro chat: "Mô tả đoạn khó hiểu; AI sẽ hỏi lại để xác định chính xác khái niệm bạn thiếu". Giới hạn: chỉ chẩn đoán trong phạm vi concept graph của khoá |
| **Evidence/uncertainty thể hiện thế nào?** | Sau khi khoanh vùng, hiện "Gap dựa trên: checkpoint 2 sai + câu hỏi 1,3". Nếu chưa chắc, hiện thanh tự tin "AI 70% chắc..." và hỏi xác nhận lại | Card hiện evidence: "Vì bạn đọc lại phần 3 được 4 lần" và dùng ngôn ngữ xác suất "Có thể bạn vướng X". Tự tin thấp → không hiện card hoặc gắn nhãn "có thể" | AI tóm tắt lại: "Theo '...' bạn mô tả + câu trả lời → khái niệm khả nghi X (3/5 điểm). Đúng vậy?" — biến uncertainty thành câu hỏi xác nhận cho learner quyết |
| **User kiểm soát và recovery thế nào?** | Nút "Bỏ qua chẩn đoán, mở refresher ngay", "Làm lại", "Đánh dấu sai"; mỗi bước có dismiss. Sau refresher quay lại đúng phần slide (bookmark), mở lại từ sidebar bất cứ lúc nào | Nút dismiss card, "Không đúng — giải thích khác", tắt hẳn theo dõi (privacy), tạm ngừng gợi ý N phút. Refresher mở panel phụ, không rời bài, quay lại đúng chỗ đang đọc | Sửa lại mô tả, chọn khái niệm khác nếu thấy sai ("Không phải, là cái khác"), thoát chat bất cứ lúc nào. Refresher gắn vào phần slide được đề cập, quay lại đúng chỗ |