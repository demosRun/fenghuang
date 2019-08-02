vertices = []

with open('./obj/people.obj','r',encoding='utf-8') as f:
  for line in f.readlines():
    if (line.startswith('v ')):
      line = line.replace('\n', '')
      value = line.split(' ')
      vertices.append(str(round(float(value[1]) * 50, 2) - 17))
      vertices.append(str(round(float(value[2]) * 50, 2) - 7))
      vertices.append(str(round(float(value[3]) * 50, 2)))

# 写文件
f = open('output.txt','w', encoding='utf-8')
outputData = '{name:"test", vertices: ' + str(vertices) + '}'
f.write(outputData)
f.close()
# print(vertices)
      