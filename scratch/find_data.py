import os

search_dir = "c:/Users/ASUS/Desktop/LeeGo/TẠO APP - UP 1/leegoup1"
terms = ["InteractiveGame", "practiceQuestions", "curriculum", "Lesson 3", "checkUp"]

for root, dirs, files in os.walk(search_dir):
    if "node_modules" in root or ".git" in root or "scratch" in root:
        continue
    for file in files:
        if file.endswith((".ts", ".tsx", ".json")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    found = [t for t in terms if t in content]
                    if found:
                        print(f"{file}: found {found}")
            except Exception as e:
                pass

