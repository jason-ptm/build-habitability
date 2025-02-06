from flask import Flask, jsonify, request
from flask_cors import CORS
import igraph as ig
import plotly.graph_objs as go

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": ["http://localhost:3000", "http://localhost:5173"]}})

@app.route('/', methods=['POST'])
def graph():
    # Esperamos recibir el cuerpo de la solicitud JSON con 'nodes' y 'links'
    content = request.json
    nodes = content.get('nodes', [])
    links = content.get('links', [])

    # Construcción de la red
    N = len(nodes)
    L = len(links)
    Edges = [(link['source'], link['target']) for link in links]

    G = ig.Graph(Edges, directed=False)

    labels = [node['name'] for node in nodes]
    group = [node['group'] for node in nodes]

    layt = G.layout('kk', dim=3)

    Xn = [layt[k][0] for k in range(N)]  # Coordenadas X de los nodos
    Yn = [layt[k][1] for k in range(N)]  # Coordenadas Y
    Zn = [layt[k][2] for k in range(N)]  # Coordenadas Z
    Xe = []  # Coordenadas X para las aristas
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

    response_data = {
        'data': [trace1.to_plotly_json(), trace2.to_plotly_json()],
        'layout': layout.to_plotly_json()
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)