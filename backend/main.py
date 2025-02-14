from flask import Flask, jsonify, request
from flask_cors import CORS
import igraph as ig
import plotly.graph_objs as go
import re

app = Flask(_name_)
CORS(app, resources={r"/": {"origins": ["http://localhost:3000", "http://localhost:5173"]}})

@app.route('/', methods=['POST'])
def graph():
    content = request.json
    nodes = content.get('nodes', [])
    links = content.get('links', [])
    reference_temperature = content.get('temperature', 25)  # Default reference temperature

    N = len(nodes)
    L = len(links)
    Edges = [(link['source'], link['target']) for link in links]

    G = ig.Graph(Edges, directed=False)
    labels = [node['name'] for node in nodes]
    group = [node['group'] for node in nodes]

    layt = G.layout('kk', dim=3)

    Xn = [layt[k][0] for k in range(N)]
    Yn = [layt[k][1] for k in range(N)]
    Zn = [layt[k][2] for k in range(N)]
    Xe = []
    Ye = []
    Ze = []
    for e in Edges:
        Xe += [layt[e[0]][0], layt[e[1]][0], None]
        Ye += [layt[e[0]][1], layt[e[1]][1], None]
        Ze += [layt[e[0]][2], layt[e[1]][2], None]

    # Asigna colores específicos basado en el grupo (1, 2, 3) -> (azul, verde, rojo)
    color_map = {1: 'blue', 2: 'green', 3: 'red'}
    node_colors = [color_map.get(g, 'gray') for g in group]  # Asume gris para grupos desconocidos

    trace1 = go.Scatter3d(x=Xe, y=Ye, z=Ze, mode='lines',
                          line=dict(color='rgb(125,125,125)', width=1),
                          hoverinfo='none')

    trace2 = go.Scatter3d(x=Xn, y=Yn, z=Zn, mode='markers',
                          name='nodes',
                          marker=dict(symbol='circle',
                                      size=6,
                                      color=node_colors,
                                      line=dict(color='rgb(50,50,50)', width=0.5)),
                          text=labels,
                          hoverinfo='text')

    layout = go.Layout(
        width=800,
        height=582,
        showlegend=False,
        scene=dict(
            xaxis=dict(showbackground=False, zeroline=False, showgrid=False, showticklabels=False, title=''),
            yaxis=dict(showbackground=False, zeroline=False, showgrid=False, showticklabels=False, title=''),
            zaxis=dict(showbackground=False, zeroline=False, showgrid=False, showticklabels=False, title='')
        ),
        margin=dict(t=100),
        hovermode='closest'
    )

    fig = go.Figure(data=[trace1, trace2], layout=layout)
    messages = []
    all_group_3_or_1 = True

    # Procesar cada nodo para obtener la temperatura y generar mensajes
    for i, node in enumerate(nodes):
        if 'name' not in node or 'group' not in node:
            print(f"Node missing expected properties: {node}")
            continue
        
        name = node['name']
        match = re.match(r"(\d+)\s*-\s*(-?\d+\.\d+)°C", name)
        if not match:
            print(f"No match for node name: {name}")
            continue

        apt_code, temperature = match.groups()
        temperature = float(temperature)
        node_group = node['group']

        # Imprime el grupo y nombre para cada nodo para la depuración
        print(f"Processing node: Name='{name}', Group={node_group}")

        # Verificación de todos los grupos 1 o 3
        if node_group not in (1, 3):
            all_group_3_or_1 = False

        # Implementar la lógica para los mensajes
        if node_group == 3:
            if 0 <= (temperature - reference_temperature) <= 3:
                messages.append(f"{apt_code} se recomienda posponer actividades mientras disminuye la temperatura")

            neighbor_indices = G.neighbors(i)
            neighbor_groups = [group[j] for j in neighbor_indices]
            if neighbor_groups.count(3) >= 2:
                messages.append(f"{apt_code} se recomienda poner aislante en las paredes con los apartamentos vecinos")

    if all_group_3_or_1:
        messages.append("Se recomienda implantar aislantes térmicos o calefacción")

    response_data = {
        'data': [trace1.to_plotly_json(), trace2.to_plotly_json()],
        'layout': layout.to_plotly_json(),
        'messages': messages
    }

    return jsonify(response_data)

if _name_ == '_main_':
    app.run(debug=True)