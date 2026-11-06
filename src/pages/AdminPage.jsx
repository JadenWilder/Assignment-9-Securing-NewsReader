
import { useArticles } from '../context/ArticlesContext';

function AdminPage() {
  const { allUserArticles } = useArticles();

  const usernames = Object.keys(allUserArticles);

  return (
    <div>
      <h2 className="page-heading">Admin Dashboard</h2>

      <div
        style={{
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '24px'
        }}
      >
        <p style={{ margin: 0, color: '#856404' }}>
          Admin View: You can see all users' saved articles.
        </p>
      </div>

      {usernames.length === 0 ? (
        <div className="message">
          No users have saved any articles yet.
        </div>
      ) : (
        <div>
          {usernames.map((username) => {
            const articles = allUserArticles[username];

            return (
              <div key={username} style={{ marginBottom: '32px' }}>
                <h3>
                  {username}'s Saved Articles ({articles.length})
                </h3>

                {articles.length === 0 ? (
                  <p>No saved articles.</p>
                ) : (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: '16px'
                    }}
                  >
                    {articles.map((article) => (
                      <div
                        key={article.url}
                        style={{
                          background: 'white',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          padding: '16px'
                        }}
                      >
                        <h4>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {article.title}
                          </a>
                        </h4>

                        <p>
                          {article.section} •{' '}
                          {new Date(article.published_date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
