vertices = []

with open('./danghui.obj','r',encoding='utf-8') as f:
  for line in f.readlines():
    if (line.startswith('v ')):
      line = line.replace('\n', '')
      value = line.split(' ')
      vertices.append(str(round(float(value[1]) * 0.5, 2)))
      vertices.append(str(round(float(value[2]) * 0.5, 2)))
      vertices.append(str(round(float(value[3]) * 0.5, 2)))

# 写文件
f = open('output2.txt','r+', encoding='utf-8')
f.write(str(vertices))
f.close()
# print(vertices)
      