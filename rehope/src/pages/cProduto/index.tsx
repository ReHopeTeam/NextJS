import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Lucide from "@/utils/lucide";
import { ChangeEvent, useEffect, useState } from "react";

const CadastroProduto = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagemUrl = URL.createObjectURL(file);
      setPreview(imagemUrl);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          <form className="form grid">
            <div className="column full_height">
              <div className="campo_form">
                <label htmlFor="upload-foto" className="input_upload">
                  {preview ? (
                    <div className="relative_pos full_size_preview">
                      <img
                        src={preview}
                        alt="Preview"
                        className="preview_img"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="btn_delete"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <>
                      <Lucide name="Upload" size={24} className="upload_lucide"/>
                      <span>Escolher Imagem</span>
                    </>
                  )}
                </label>
                <input
                  id="upload-foto"
                  type="file"
                  accept="image/*"
                  className="input_img"
                  onChange={handleFileChange}
                />
              </div>
              {/* Restante dos campos */}
              <div className="campo_form">
                <Lucide name="RectangleEllipsis" className="lucide" />
                <input
                  type="text"
                  id="codigo"
                  placeholder=" "
                  className="input small"
                  required
                />
                <label htmlFor="codigo" className="label">
                  Código
                </label>
              </div>
            </div>

            <div className="column full_height">
              <div className="campo_form">
                <Lucide name="ALargeSmall" className="lucide" />
                <input
                  type="text"
                  id="titulo"
                  placeholder=" "
                  className="input"
                  required
                />
                <label htmlFor="titulo" className="label">
                  Título
                </label>
              </div>
              <div className="campo_select">
                <Lucide name="MapPin" className="lucide" />
                <select
                  name="localizacao"
                  id="localizacao"
                  className="select"
                  required
                >
                  <option value=""></option>
                  <option value="1">Localização 1</option>
                  <option value="2">Localização 2</option>
                </select>
                <label htmlFor="localizacao" className="label">
                  Localização
                </label>
              </div>
              <div className="campo_select">
                <Lucide name="User" className="lucide" />
                <select name="usuario" id="usuario" className="select" required>
                  <option value=""></option>
                  <option value="1">Usuário 1</option>
                  <option value="2">Usuário 2</option>
                </select>
                <label htmlFor="usuario" className="label">
                  Usuário
                </label>
              </div>
              <div className="campo_form row">
                <Lucide name="Tag" className="lucide" />
                <div className="campo_form">
                  <input
                    type="text"
                    id="preco"
                    placeholder=" "
                    className="input"
                    required
                  />
                  <label htmlFor="preco" className="label">
                    Preço
                  </label>
                </div>
                <div className="campo_select">
                  <Lucide name="RulerDimensionLine" className="lucide" />
                  <select
                    name="tamanho"
                    id="tamanho"
                    className="select"
                    required
                  >
                    <option value=""></option>
                    <option value="1">Tamanho 1</option>
                    <option value="2">Tamanho 2</option>
                  </select>
                  <label htmlFor="tamanho" className="label">
                    Tamanho
                  </label>
                </div>
              </div>
            </div>
            <div className="column full_height">
              <div className="campo_form">
                <Lucide name="MessageSquareText" className="lucide desc_lucide" />
                <textarea
                  id="descricao"
                  placeholder=" "
                  className="textarea"
                  required
                />
                <label htmlFor="descricao" className="label">
                  Descrição
                </label>
              </div>

              <div className="campo_select row">
                <div className="campo_select">
                  <Lucide name="Type" className="lucide" />
                  <select name="tipo" id="tipo" className="select" required>
                    <option value=""></option> <option value="1">Tipo 1</option>
                    <option value="2">Tipo 2</option>
                  </select>
                  <label htmlFor="tipo" className="label">
                    Tipo
                  </label>
                </div>
                <div className="campo_select">
                  <Lucide name="Grid2X2" className="lucide" />
                  <select
                    name="categoria"
                    id="categoria"
                    className="select"
                    required
                  >
                    <option value=""></option>
                    <option value="1">Categoria 1</option>
                    <option value="2">Categoria 2</option>
                  </select>
                  <label htmlFor="categoria" className="label">
                    Categoria
                  </label>
                </div>
              </div>
            </div>
            <Button children="Salvar" />
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CadastroProduto;
