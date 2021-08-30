import { Link } from "react-router-dom";
import * as layoutStyles from "./layout.module.scss";
function Layout(props) {
  return (
    <main className={layoutStyles.main}>
      <header>
        <nav className={layoutStyles.nav}>
          <h1>{props.title}</h1>
          <div className={layoutStyles.actionBtns}>
            {/* Actions Here */}
            {props.actions &&
              props.actions.map((action, index) => (
                <div key={index}>
                  {action.link ? (
                    <Link to={action.link}>
                      <button
                        id={action.id && action.id}
                        className={
                          action.class && `${layoutStyles[action.class]}`
                        }
                      >
                        {action.title}
                      </button>
                    </Link>
                  ) : (
                    <button
                      id={action.id && action.id}
                      className={
                        action.class && `${layoutStyles[action.class]}`
                      }
                      onClick={action.onclick && action.onclick}
                    >
                      {action.title}
                    </button>
                  )}
                </div>
              ))}
          </div>
        </nav>
      </header>
      <section className={layoutStyles.content}>{props.children}</section>
      <footer className={layoutStyles.footer}>Scandiweb Test assignment</footer>
    </main>
  );
}

export default Layout;
