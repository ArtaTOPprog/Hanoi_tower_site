import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const codeRec = `
        #include <stdio.h>

        int move(int i, int m, int n) {
            int s = 0;
            if (i == 1) {
                printf("\\n%d > %d", m, n);
            } else {
                s = 6 - m - n;
                move(i - 1, m, s);
                printf("\\n%d > %d", m, n);
                move(i - 1, s, n);
            }
            return 0;
        }

        int main() {
            int dsc, n, k;
            printf("Number of disks:");
            scanf("%d", &dsc);
            printf("Starting tower:");
            scanf("%d", &n);
            printf("Ending tower:");
            scanf("%d", &k);
            move(dsc, n, k);
            return 0;
        }`;

  const codeIter = `
        #include <stdio.h>
        #include <math.h>

        int fd(int m) {
            int i = 0;
            int deg2value = 1;
            while ((m % deg2value) == 0) {
                i++;
                deg2value *= 2;
            }
            return i;
        }

        int nqmove(int m, int i) {
            int deg2value = (int)pow(2, i - 1);
            int nm = m / deg2value;
            if (nm % 2 == 0) {
                nm--;
            }
            nm = (nm + 1) / 2;
            return nm;
        }

        int postow(int step, int cyclet, int n, int s, int k) {
            int pos = step % 3;
    
            if (cyclet == 1) {
                if (pos == 0) return n;
                else if (pos == 1) return k;
                else return s;
            } else {
                if (pos == 0) return n;
                else if (pos == 1) return s;
                else return k;
            }
        }

        int main() {
            int dsc, k, n, allmoves, s; 
            printf("Number of disks:");
            scanf("%d", &dsc);
            allmoves = (int)pow(2, dsc) - 1;  
            printf("Starting tower:");
            scanf("%d", &n);
            printf("Ending tower:");
            scanf("%d", &k);
            s = 6-n-k; 
            for (int m = 1; m <= allmoves; m++) {
                int i = fd(m); 
                int nm = nqmove(m, i); 
                int cyclet;
                if (dsc % 2 == 1) {
                    if (i % 2 == 1){
                        cyclet = 1;
                    }
                    else {
                        cyclet = 2;
                    }
                } else {
                    if (i % 2 == 1){
                        cyclet = 2;
                    }
                    else {
                        cyclet = 1;
                    }
                }
                int from = postow(nm - 1, cyclet, n, s, k);
                int to = postow(nm, cyclet, n, s, k);
                printf("%d > %d", from, to);
            }
            return 0;
        }

  `

  return (
    <>
      <div className="app">
        <header className="header">
          <h1 className="title">🏯 Ханойская башня</h1>
          <p className="subtitle">Рекурсивное и итеративное решение с пояснением</p>
        </header>

        <section className="code-section fade-in">
          <h2 className="code-title">🌀 Рекурсивный метод</h2>
          <pre className="code-block">
            <code>{codeRec}</code>
          </pre>

          <div className="explanation fade-in delay">
            <h3>📘 Объяснение:</h3>
            <p>
              Решение основано на <b>рекурсивной стратегии</b>:
            </p>
            <ul>
              <li>Переместить <b>n-1 дисков</b> с начального стержня на вспомогательный.</li>
              <li>Переместить <b>нижний диск</b> с начального стержня на целевой.</li>
              <li>Переместить <b>n-1 дисков</b> с вспомогательного стержня на целевой.</li>
            </ul>

            <p><b>Логика рекурсии:</b></p>
            <ul>
              <li><b>Базовый случай:</b> Если <code>i == 1</code> — диск перемещается напрямую с <code>m</code> на <code>n</code>.</li>
              <li><b>Рекурсивный случай:</b></li>
              <ul>
                <li><code>s = 6 - m - n</code> — вычисление вспомогательного стержня (так как 1 + 2 + 3 = 6).</li>
                <li><code>move(i - 1, m, s)</code> — перемещение <b>i - 1</b> дисков на вспомогательный стержень.</li>
                <li>Вывод перемещения нижнего диска с <code>m</code> на <code>n</code>.</li>
                <li><code>move(i - 1, s, n)</code> — перенос <b>i - 1</b> дисков с вспомогательного стержня на целевой.</li>
              </ul>
            </ul>
          </div>
        </section>

        <section className="code-section fade-in delay">
          <h2 className="code-title">⚙️ Итеративный метод</h2>
          <pre className="code-block">
            <code>{codeIter}</code>
          </pre>

          <div className="explanation fade-in delay">
            <h3>📗 Подробное объяснение итеративного метода:</h3>
            <p>
              Данный код реализует <b>итеративное решение</b> задачи Ханойских башен,
              основанное на математических закономерностях и анализе двоичных чисел.
            </p>

            <p>
              Вместо рекурсии используется <b>код Грея</b> и закономерности перемещения
              дисков между башнями.
            </p>

            <h4>🔹 Функция <code>fd(int m)</code></h4>
            <p>Определяет, какой диск перемещается на ходе <code>m</code>.</p>

            <table className="table">
              <thead>
                <tr><th>m</th><th>Двоичное представление</th><th>Перемещаемый диск</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>0001</td><td>1</td></tr>
                <tr><td>2</td><td>0010</td><td>2</td></tr>
                <tr><td>3</td><td>0011</td><td>1</td></tr>
                <tr><td>4</td><td>0100</td><td>3</td></tr>
                <tr><td>5</td><td>0101</td><td>1</td></tr>
                <tr><td>6</td><td>0110</td><td>2</td></tr>
              </tbody>
            </table>

            <h4>🔹 Функция <code>nqmove(int m, int i)</code></h4>
            <p>Вычисляет, какой по счёту это ход для данного диска <code>i</code>.</p>
            <ul>
              <li>Диск 1 перемещается каждый нечётный ход.</li>
              <li>Диск 2 — на ходах, кратных 2.</li>
              <li>Диск 3 — на ходах, кратных 4.</li>
              <li>Диск i — на ходах, кратных <code>2^(i-1)</code>.</li>
            </ul>

            <p>
              Пример: <code>m = 6</code>, <code>i = 2</code> → <b>nm = 2</b>.
            </p>

            <h4>🔹 Функция <code>postow(int step, int cyclet, int n, int s, int k)</code></h4>
            <p>
              Определяет текущее положение диска и просчитывает его следующее перемещение.
            </p>
            <p>
              При нечётном количестве дисков используется цикл <b>n → k → s → n</b>,
              при чётном — <b>n → s → k → n</b>.
            </p>
          </div>
        </section>

        <footer className="footer">
          <p>✨ Создано с любовью и в помощь вам ❤️</p>
        </footer>
      </div>
    </>
  )
}

export default App
