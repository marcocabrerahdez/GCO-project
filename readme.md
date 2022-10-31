# Proyecto de la asignatura GCO

**Descripción de código desarrollado**

Nuestra implementación del sistema recomendador hace uso del framework Next.JS basado en React, en esta implmentación se ha definido una página principal en la cuál se nos presentan 3 selectores que especifican los parámetros de ejecución y calculo del sistema recomendandor. 

Una vez introducidos los parámetros, se puede proceder a la carga de la matriz, mediante el boton *Ejecucion* que invoca a la funcion que construye la matriz resultado. Esta función, además de mostrar la matriz, invova a otra función que busca en cada iteración el usuario que tiene una entrada sin valorar, fijando este usuario para realizar la predicción. Antes de proseguir, se seleccionan tantos vecinos adyacentes como se han especificado por entrada y se calcula la métrica sobre esos valores. A continuación, con la matriz de utilidad se comienza a realizar la predicción según se haya seleccionado. Esta hace uso de todas los parámetros dados por pantalla y la matriz de utilidad. Todo esto se repite mientras hayan usuario con objetos sin valorar, esto se hace recursivamente hasta que se valoran todas las incógnitas. 

Por ultimo, se alamacena un historial de operaciones que se muestra por pantalla, con todas las que se nos pide en el guión de la práctica.

**Leyenda de ejecución**

```text
- Métrica: Elección de la métrica de utilizada

  0. Visuzalizar matriz
  1. Coseno
  2. Pearson
  3. Euclídea

- Vecinos: indica el número de vecinos.

- Predicción: indica el tipo de predicción utilizada

  1. Simple
  2. Desviación de la media
```

**Ejemplo de uso**

1. Ingresar en la web [GCO-Project](https://gco-project.vercel.app)
2. Elegir valores para la métrica, vecinos y tipo de predicción
3. Cargar un fichero que contenga la matriz definada separada con espacios y las incógnitas tomen valor -1
4. Hacer click en el botón *Ejecución*
5. Visualizar los resultados
